import styled from 'styled-components';

const Button = ({ text = "More", onClick, bgColor = "red" }) => {
  return (
    <StyledButton onClick={onClick} $bgColor={bgColor}>
      <svg viewBox="0 0 24 24" className="arr-2" stroke="white" strokeWidth="2" fill="white">
        <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
      </svg>
      <h1 className="text">{text}</h1>
      <span className="circle" />
      <svg viewBox="0 0 24 24" className="arr-1" stroke="white" strokeWidth="2" fill="white">
        <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
      </svg>
    </StyledButton>
  );
};

const StyledButton = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 40px;
  font-size: 24px;
  background-color: ${(props) => props.$bgColor};
  border-radius: 10px;
  font-weight: 700;
  color: white;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);

  svg {
    position: absolute;
    width: 24px;
    fill: white;
    z-index: 9;
    transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .arr-1 {
    right: 16px;
    filter: drop-shadow(0 0 1px white);
  }

  .arr-2 {
    left: -25%;
    filter: drop-shadow(0 0 1px white);
  }

  .circle {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 20px;
    height: 20px;
    background-color: black;
    border-radius: 50%;
    opacity: 0;
    transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
    pointer-events: none;
  }

  .text {
    position: relative;
    z-index: 1;
    transform: translateX(-12px);
    transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
  }

  &:hover {
    color: white;
    border-radius: 80px;
  }

  &:hover .arr-1 {
    right: -25%;
    fill: white;
    transform: rotate(200deg);
  }

  &:hover .arr-2 {
    left: 16px;
    fill: white;
    transform: rotate(360deg);
  }

  &:hover .text {
    transform: translateX(12px);
  }

  &:hover svg {
    fill: #212121;
  }

  &:active {
    scale: 0.95;
  }

  &:hover .circle {
    width: 100%;
    height: 220px;
    opacity: 1;
  }
`;

export default Button;
