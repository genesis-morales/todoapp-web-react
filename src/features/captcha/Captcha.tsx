import { Input } from "antd";
import React, { useEffect, useRef, useState } from "react";
import "../forget-password/ForgetPassword.scss";

interface CaptchaProps {
  onValidate: (valid: boolean) => void;
}

const Captcha: React.FC<CaptchaProps> = ({ onValidate }) => {
  const [captcha, setCaptcha] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Generate captcha (4 digits)
  const generateCaptcha = () => {
    const chars = "0123456789";
    let result = "";
    for (let i = 0; i < 4; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptcha(result);
  };

  // Draw captcha on canvas
  const drawCaptcha = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "bold 32px Arial";
    ctx.fillStyle = "#f9f9f9";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Numbers in captcha
    for (let i = 0; i < captcha.length; i++) {
      const colors = ["#4CAF50", "#03A9F4", "#8E24AA", "#E91E63"];
      ctx.fillStyle = colors[i % colors.length];
      ctx.fillText(captcha[i], 20 + i * 25, 35);
    }

    // Lines
    for (let i = 0; i < 3; i++) {
      ctx.strokeStyle = `hsl(${Math.random() * 360}, 100%, 50%)`;
      ctx.beginPath();
      ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.stroke();
    }
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  useEffect(() => {
    drawCaptcha();
  }, [captcha]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    onValidate(value === captcha);
  };

  return (
    <div className="captcha-container">
      <div className="captcha-box">
        <canvas ref={canvasRef} width={130} height={45} className="captcha-canvas" />
        <button type="button" className="captcha-refresh" onClick={generateCaptcha}>
          ↻
        </button>
      </div>
      <Input
        placeholder="Enter captcha"
        value={inputValue}
        onChange={handleChange}
        size="large"
        className="forget-form-input"
        required
      />
    </div>
  );
};

export default Captcha;