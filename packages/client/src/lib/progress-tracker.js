class ProgressTracker {
    constructor(sessionId, notifyUrl, options = {}) {
        this.sessionId = sessionId;
        this.notifyUrl = notifyUrl;
        this.options = {
            updateInterval: 5000,
            usePostMessage: false,
            ...options
        };
        this.lastSnapshot = '';
        this.isActive = true;
        this.startTime = Date.now();
        
        this.setupPeriodicUpdates();
    }

    setupPeriodicUpdates() {
        if (this.options.updateInterval > 0) {
            this.intervalId = setInterval(() => {
                if (this.lastGrid && this.isActive) {
                    this.sendProgressUpdate(this.lastGrid, false);
                }
            }, this.options.updateInterval);
        }
    }

    extractProgressData(grid) {
        const cells = grid.get('cells');
        const currentDigits = cells.map(c => c.get('digit')).join('');
        
        const innerPencilMarks = {};
        const outerPencilMarks = {};
        
        cells.forEach(cell => {
            const index = cell.get('index');
            const inner = cell.get('innerPencils');
            const outer = cell.get('outerPencils');
            
            if (inner.size > 0) {
                innerPencilMarks[index] = inner.toArray().sort();
            }
            if (outer.size > 0) {
                outerPencilMarks[index] = outer.toArray().sort();
            }
        });

        const elapsedTime = this.calculateElapsedTime(grid);
        
        return {
            sessionId: this.sessionId,
            timestamp: Date.now(),
            gameState: {
                currentDigits,
                initialDigits: grid.get('initialDigits'),
                elapsedTime,
                isPaused: !!grid.get('pausedAt'),
                isComplete: grid.get('solved'),
                hintsUsed: grid.get('hintsUsed').size,
                pencilMarks: {
                    inner: innerPencilMarks,
                    outer: outerPencilMarks
                },
                completedDigits: grid.get('completedDigits'),
                hasErrors: grid.get('hasErrors'),
                mode: grid.get('mode'),
                difficultyLevel: grid.get('difficultyLevel')
            }
        };
    }

    calculateElapsedTime(grid) {
        const startTime = grid.get('startTime');
        const endTime = grid.get('endTime');
        const pausedAt = grid.get('pausedAt');
        const intervalStartTime = grid.get('intervalStartTime');
        
        if (!startTime) return 0;
        
        if (endTime) {
            return endTime - startTime;
        }
        
        if (pausedAt) {
            return pausedAt - intervalStartTime;
        }
        
        return Date.now() - intervalStartTime;
    }

    onGridChange(grid) {
        if (!this.isActive) return;
        
        this.lastGrid = grid;
        const currentSnapshot = grid.get('currentSnapshot');
        const isComplete = grid.get('solved');
        
        const shouldSendUpdate = 
            currentSnapshot !== this.lastSnapshot || 
            isComplete ||
            grid.get('pausedAt') !== this.lastPausedState;
        
        if (shouldSendUpdate) {
            this.sendProgressUpdate(grid, isComplete);
            this.lastSnapshot = currentSnapshot;
            this.lastPausedState = grid.get('pausedAt');
        }
    }

    sendProgressUpdate(grid, isImmediate = false) {
        const progressData = this.extractProgressData(grid);
        
        if (this.options.usePostMessage) {
            this.sendViaPostMessage(progressData, isImmediate);
        } else {
            this.sendViaHttp(progressData, isImmediate);
        }
    }

    sendViaPostMessage(data, isImmediate) {
        try {
            const message = {
                type: 'sudoku-progress',
                immediate: isImmediate,
                data: data
            };
            
            if (window.parent && window.parent !== window) {
                window.parent.postMessage(message, '*');
            }
            
            if (window.opener) {
                window.opener.postMessage(message, '*');
            }
        } catch (error) {
            console.warn('Failed to send progress via postMessage:', error);
        }
    }

    sendViaHttp(data, isImmediate) {
        if (!this.notifyUrl) return;
        
        const payload = {
            ...data,
            immediate: isImmediate
        };
        
        fetch(this.notifyUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
            mode: 'cors'
        }).catch(error => {
            console.warn('Failed to send progress update:', error);
        });
    }

    sendCompletionUpdate(grid) {
        if (!this.isActive) return;
        
        const progressData = this.extractProgressData(grid);
        progressData.gameState.completionTime = this.calculateElapsedTime(grid);
        progressData.gameState.finalResult = grid.get('solved') ? 'solved' : 'incomplete';
        
        this.sendProgressUpdate(grid, true);
        
        this.destroy();
    }

    destroy() {
        this.isActive = false;
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }
}

export function createProgressTracker(sessionId, notifyUrl, options) {
    if (!sessionId) return null;
    
    return new ProgressTracker(sessionId, notifyUrl, options);
}

export function parseProgressParams() {
    const params = new URLSearchParams(window.location.search);
    
    return {
        sessionId: params.get('session'),
        notifyUrl: params.get('notify'),
        updateInterval: parseInt(params.get('interval')) || 5000,
        usePostMessage: params.get('method') === 'message'
    };
}
