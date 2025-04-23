interface Props {
  message: string;
}

export default function ErrorMessage({ message }: Props) {
  if (message) {
    return <p className="error-message">{message}</p>;
  }

  return null;
}
