import { MailOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input } from "antd";
import { useState } from "react";
import Captcha from '../captcha/Captcha';
import "./ForgetPassword.scss";


export function ForgetPassword() {
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);

  const handleSubmit = (values: any) => {
    if (!isCaptchaValid) {
      alert("Wrong Captcha. Please, try again.");
      return;
    }
    console.log("Email send to:", values.email);
  };

    return (
       <div className="forget-container">
        <Card title="Forgot your password?" bordered={false} className="forget-card">
        <Form className="forget-form" 
              onFinish={handleSubmit} 
              layout="vertical" 
              colon={false}> 

            <Form.Item
            label="Please enter the email address you´d like your password reset information sent to"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
            >
            < Input className="forget-form-input"
              size="large"
              allowClear
              prefix={<MailOutlined />}
              placeholder="Email"
            />
          </Form.Item>

          <Form.Item required>
            <div className="captcha-container">
              <Captcha onValidate={setIsCaptchaValid} />
            </div>
          </Form.Item>

          <Form.Item>
            <Button
              className="forget-form-button"
              type="primary"
              htmlType="submit"
              size="large"
            >
              Request Reset Link
            </Button>
          </Form.Item>
          
          </Form>
          <div className="forget-link">
            <p>
              <a href="/login">Back to Login</a>
            </p>
          </div>
          </Card>
          </div>
    );
}