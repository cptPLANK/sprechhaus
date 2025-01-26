export interface Message {
  id: number;
  text: string;
  username: string;
  timestamp: string;
  isLoading?: boolean;
}

export interface LoginProps {
  setUsername: (name: string) => void;
}

export interface ChatProps {
  username: string;
}
