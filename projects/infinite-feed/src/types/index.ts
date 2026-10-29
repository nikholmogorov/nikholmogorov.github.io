interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface CardProps {
  post: Post;
  onClick: () => void;
}

interface ModalProps {
  post: Post;
  onClose: () => void;
}

export type { Post, CardProps, ModalProps };
