import { IconProps } from ".";

function Icon({ width = 20, height = 20, fill = "#000" }: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.9533 8.82695C19.6775 8.82695 19.9798 7.89648 19.3916 7.46758L10.4408 0.95664C10.3129 0.862989 10.1586 0.8125 10.0001 0.8125C9.84168 0.8125 9.68734 0.862989 9.55952 0.95664L0.608739 7.46758C0.0204578 7.89414 0.322802 8.82695 1.04936 8.82695H2.50015V17.5926H0.812645C0.70952 17.5926 0.625145 17.677 0.625145 17.7801V18.9988C0.625145 19.102 0.70952 19.1863 0.812645 19.1863H19.1876C19.2908 19.1863 19.3751 19.102 19.3751 18.9988V17.7801C19.3751 17.677 19.2908 17.5926 19.1876 17.5926H17.5001V8.82695H18.9533ZM10.0001 2.60898L16.354 7.23086H3.64624L10.0001 2.60898ZM4.18764 8.82695H6.92983V17.5926H4.18764V8.82695ZM8.61733 8.82695H11.3595V17.5926H8.61733V8.82695ZM15.8126 17.5926H13.047V8.82695H15.8126V17.5926Z"
        fill={fill}
      />
    </svg>
  );
}

export default Icon;