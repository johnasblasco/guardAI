import * as tf from '@tensorflow/tfjs';
import type { HealthReport, BayesianParameter } from '../types';

/**
 * Mock TensorFlow.js-based prediction engine for educational demo
 * In production, this would connect to a real ML model
 */

export class HealthPredictionEngine {
    private model: tf.LayersModel | null = null;

    /**
     * Initialize a simple LSTM model for time series prediction
     */
    async initializeModel(): Promise<void> {
        // Create a simple sequential model for demonstration
        this.model = tf.sequential({
            layers: [
                tf.layers.lstm({
                    units: 50,
                    returnSequences: false,
                    inputShape: [7, 1], // 7 days of historical data, 1 feature
                }),
                tf.layers.dense({ units: 25, activation: 'relu' }),
                tf.layers.dense({ units: 1 }), // Predict next day cases
            ],
        });

        this.model.compile({
            optimizer: tf.train.adam(0.001),
            loss: 'meanSquaredError',
        });

        console.log('TensorFlow.js model initialized');
    }

    /**
     * Predict future case counts using time series analysis
     * This is a mock implementation for demo purposes
     */
    async predictFutureCases(historicalData: number[], days: number = 14): Promise<number[]> {
        if (!this.model) {
            await this.initializeModel();
        }

        // For demo purposes, use a simple exponential smoothing approach
        const predictions: number[] = [];
        const alpha = 0.3; // Smoothing factor

        let lastValue = historicalData[historicalData.length - 1];
        let trend = historicalData.length > 1
            ? historicalData[historicalData.length - 1] - historicalData[historicalData.length - 2]
            : 0;

        for (let i = 0; i < days; i++) {
            // Simple exponential smoothing with trend
            const predicted = lastValue + trend;
            const smoothed = alpha * predicted + (1 - alpha) * lastValue;

            predictions.push(Math.max(0, Math.round(smoothed)));
            lastValue = smoothed;
            trend = trend * 0.9; // Dampen trend over time
        }

        return predictions;
    }

    /**
     * Calculate Bayesian parameters for outbreak probability
     */
    calculateBayesianParameters(reports: HealthReport[]): BayesianParameter {
        // Prior probability: historical outbreak rate (mock)
        const priorProbability = 0.15;

        // Calculate likelihood based on current reports
        const totalReports = reports.length;
        // const confirmedCases = reports.filter(r => r.confirmedDisease).length;
        const severeCases = reports.filter(r => r.severity === 'severe').length;

        // Likelihood ratio based on report characteristics
        const baselineSeverity = 0.1; // 10% baseline severe cases
        const observedSeverity = totalReports > 0 ? severeCases / totalReports : 0;
        const likelihoodRatio = observedSeverity > 0
            ? observedSeverity / baselineSeverity
            : 1;

        // Posterior probability using Bayes' theorem
        const posteriorProbability =
            (likelihoodRatio * priorProbability) /
            (likelihoodRatio * priorProbability + (1 - priorProbability));

        // Calculate confidence interval (simplified)
        const margin = 0.07;
        const confidenceInterval: [number, number] = [
            Math.max(0, posteriorProbability - margin),
            Math.min(1, posteriorProbability + margin),
        ];

        return {
            priorProbability,
            likelihoodRatio,
            posteriorProbability,
            confidenceInterval,
        };
    }

    /**
     * Detect hotspots using clustering analysis
     */
    detectHotspots(reports: HealthReport[]): Map<string, number> {
        const locationCounts = new Map<string, number>();

        reports.forEach(report => {
            const key = `${report.location.building}|${report.location.room}`;
            locationCounts.set(key, (locationCounts.get(key) || 0) + 1);
        });

        return locationCounts;
    }

    /**
     * Calculate risk score for a location (0-100)
     */
    calculateRiskScore(
        reportCount: number,
        recentReports: number,
        confirmedCases: number
    ): number {
        // Weighted scoring
        const countWeight = 0.4;
        const recentWeight = 0.3;
        const confirmedWeight = 0.3;

        const countScore = Math.min(100, reportCount * 20);
        const recentScore = Math.min(100, recentReports * 30);
        const confirmedScore = Math.min(100, confirmedCases * 40);

        return Math.round(
            countScore * countWeight +
            recentScore * recentWeight +
            confirmedScore * confirmedWeight
        );
    }

    /**
     * Generate prediction confidence intervals using Monte Carlo simulation
     */
    generateConfidenceIntervals(
        prediction: number,
        variance: number = 0.2
    ): [number, number] {
        const lowerBound = Math.max(0, Math.floor(prediction * (1 - variance)));
        const upperBound = Math.ceil(prediction * (1 + variance));
        return [lowerBound, upperBound];
    }

    /**
     * Analyze trend direction
     */
    analyzeTrend(values: number[]): 'increasing' | 'stable' | 'decreasing' {
        if (values.length < 2) return 'stable';

        const recentValues = values.slice(-5);
        const average = recentValues.reduce((a, b) => a + b, 0) / recentValues.length;
        const lastValue = recentValues[recentValues.length - 1];

        const percentDiff = ((lastValue - average) / average) * 100;

        if (percentDiff > 10) return 'increasing';
        if (percentDiff < -10) return 'decreasing';
        return 'stable';
    }
}

// Export singleton instance
export const predictionEngine = new HealthPredictionEngine();
