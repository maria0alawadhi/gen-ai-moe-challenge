import {
  FullTestItem,
  SpeakingFeedbackAll,
  WritingFeedbackAll,
} from '../../../functions/src/utilities/fullTestUtilities';
import { sampleFullTest } from './sampleFullTest';
import { isWSError } from './types';

export const calculateWritingFeedbackScore = (feedback: WritingFeedbackAll) => {
  if (isWSError(feedback[0]) || isWSError(feedback[1])) {
    return 0;
  }
  const writingfeedbackscore =
    0.4 * feedback[0].score + 0.6 * feedback[1].score;
  return writingfeedbackscore;
};

export const calculateSpeakingFeedbackScore = (
  feedback: SpeakingFeedbackAll,
) => {
  if (
    isWSError(feedback[0]) ||
    isWSError(feedback[1]) ||
    isWSError(feedback[2])
  ) {
    return 0;
  }
  const writingfeedbackscore =
    0.3 * feedback[0].score + 0.3 * feedback[1].score + 0.4 * feedback[2].score; // this needs confirmation from the speaking team
  return writingfeedbackscore;
};

export const calculateFinalScore = (test: FullTestItem): number | 'error' => {
  const readingFeedback = test.readingAnswer?.feedback;
  const writingFeedback = test.writingAnswer?.feedback;
  const speakingFeedback = test.speakingAnswer?.feedback;
  const listeningFeedback = test.listeningAnswer?.feedback;

  if (!readingFeedback || isWSError(readingFeedback)) {
    return 'error';
  }

  if (
    !writingFeedback ||
    isWSError(writingFeedback[0]) ||
    isWSError(writingFeedback[1])
  ) {
    return 'error';
  }

  if (
    !speakingFeedback ||
    isWSError(speakingFeedback[0]) ||
    isWSError(speakingFeedback[1]) ||
    isWSError(speakingFeedback[2])
  ) {
    return 'error';
  }

  if (!listeningFeedback || isWSError(listeningFeedback)) {
    return 'error';
  }

  const total =
    readingFeedback.BandScore +
    listeningFeedback.BandScore +
    calculateWritingFeedbackScore(writingFeedback) +
    calculateSpeakingFeedbackScore(speakingFeedback);

  return total / 4;
};


export const  getEuropeanFrameworkGrade = (test: FullTestItem): string | 'error' =>{
  const result = calculateFinalScore(sampleFullTest);
  if(result == 'error'){
    return 'error';
  }
  else if (result >= 36) {
    return 'C2';
  } else if (result >= 32) {
    return 'C1';
  } else if (result >= 28) {
    return 'B2';
  } else if (result >= 24) {
    return 'B1';
  } else if (result >= 20) {
    return 'A2';
  } else {
    return 'A1';
  }
}