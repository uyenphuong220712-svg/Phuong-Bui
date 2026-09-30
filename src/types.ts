export interface VocabularyItem {
  id: string;
  word: string;
  category: 'water' | 'light' | 'sound' | 'trees' | 'scent_touch' | 'emotion' | 'motion';
  type: 'Từ láy' | 'Từ ghép' | 'Tính từ' | 'Từ tượng thanh' | 'Từ tượng hình';
  meaning: string;
  exampleSentence: string;
  scenes: ('sông' | 'hồ' | 'suối' | 'biển' | 'ao')[];
}

export interface LiteraryDeviceItem {
  id: string;
  type: 'so_sanh' | 'nhan_hoa' | 'lien_tuong';
  target: 'Mặt nước' | 'Dòng sông' | 'Sóng biển' | 'Con suối' | 'Cây cối bờ sông' | 'Ánh nắng' | 'Thuyền bè';
  phrase: string;
  explanation: string;
  hintForStudent: string;
}

export interface PoetryHook {
  id: string;
  author?: string;
  quote: string;
  scene: string;
  guidingIntro: string;
}

export interface OutlineData {
  studentName: string;
  studentClass: string;
  topicTitle: string;
  sceneType: 'Dòng sông' | 'Hồ nước' | 'Bãi biển' | 'Con suối' | 'Ao sen / Ao làng';
  location: string;
  
  // I. Mở bài
  introQuote: string;
  introDetails: string;
  
  // II. Thân bài
  // 1. Tả bao quát
  overviewImpression: string;
  overviewLocationSource: string;
  overviewNameStory: string;
  overviewDimensionComparison: string;
  overviewGeneralAtmosphere: string;
  
  // 2. Tả chi tiết
  detailPerspective: string;
  detailTimeSeasonalChange: string;
  detailWaterSurface: string;
  detailFiveSenses: string;
  detailFigurativeDevices: string;
  detailLivingCreatures: string;
  detailBanksAndTrees: string;
  detailStructures: string;
  detailFavoriteSpot: string;
  detailPersonalReflections: string;
  
  // 3. Sự vật, hiện tượng nổi bật
  peopleActivities: string;
  animalsNature: string;
  benefitsToHometown: string;
  memoriesAndFeelings: string;
  
  // III. Kết bài
  endingFeelings: string;
  endingSignificance: string;
  endingActionPledge: string;
}

export interface EssayAnalysisResult {
  transcribedText?: string;
  praisePoints: string[];
  correctionFeedback: {
    spelling: string[];
    wordChoice: string[];
    sentenceStructure: string[];
  };
  upgradeSuggestions: {
    originalSentence: string;
    hint: string;
    guidingQuestions: string;
    recommendedWords: string[];
  }[];
  emotionTips: string;
  gdptChecklist: {
    structure: string;
    sensoryDetails: string;
    figurativeDevices: string;
    wordCountEstimate: string;
  };
  encouragementMessage: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}
