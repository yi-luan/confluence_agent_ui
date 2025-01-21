export interface AskRequest {
  question: string;
  workspace: string;
}

export interface AskResponse {
  status: string;
  data: {
    question: string;
    answer: string;
    sources: Array<{
      content: string;
      summary: string;
      source: string;
    }>;
  };
}
