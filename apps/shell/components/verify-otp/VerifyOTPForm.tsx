import t from "@difx/locale";
import {
  ExtraAuth,
  useAPI,
  useAuth,
} from "@difx/shared";
import { OTPBox, Icon } from "@difx/core-ui";
import { Button, Form } from "antd";
import { FormInstance } from "antd/es/form";
import isEmpty from "lodash/isEmpty";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { API_ENDPOINT } from "@difx/shared";

export function VerifyOTPForm({sessionDetails}) {
  const [hasFieldError, setHasFieldError] = useState(true);
  const formRef = useRef<FormInstance>(null);
  const [otpValue, setOtpValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { API } = useAPI()

  const { updateSession } = useAuth();

  const router = useRouter();

  const isRequiredFieldsEmpty = (): boolean => {
    let result = false;
    const values: FormData = formRef.current?.getFieldsValue();
    /* eslint-disable-next-line */
    for (const [key, value] of Object.entries(values)) {
      if (!value) {
        result = true;
        break;
      }
    }
    return result;
  };

  const onFormChange = () => {
    if (isRequiredFieldsEmpty()) {
      setHasFieldError(true);
    } else {
      const fieldsError = formRef.current?.getFieldsError();
      const errors = fieldsError.find((e) => !isEmpty(e.errors));
      if (errors && !isEmpty(errors.errors)) {
        setHasFieldError(true);
      } else {
        setHasFieldError(false);
      }
    }
  };

  const twoFactor = async(formData) => {
    try{
      const response = await API.post(API_ENDPOINT.VERIFY_OTP, formData)
      console.log(response)
      /* eslint-disable-next-line */
      const { statusCode, data } = response?.data
      let authDetails: ExtraAuth
      switch (statusCode) {
        case 200: {
          const { permission, user } = data
          updateSession(user, permission)
          router.push("/home");
          break
        }
        case 410: {
          authDetails = {
            type: "IP_VERIFICATION",
            details: {
              email: formData.email
            }
          }
          localStorage.setItem("extraAuthRequired", JSON.stringify(authDetails))
          router.push("/verify-ip")
          break
        }
        case 411: {
          authDetails = {
            type: "TFA",
            details: {
              session_id: data.session_id
            }
          }
          localStorage.setItem("extraAuthRequired", JSON.stringify(authDetails))
          router.push("/two-factor")
          break
        }
        default:
          break
      }
    }catch(error){
      console.log(error)
    }finally{
      setOtpValue('')
      setIsLoading(false)
    }
  };


  const onSubmit = async (formData) => {
    setIsLoading(true)
    formData.code = otpValue
    if(sessionDetails.type === "email"){
      formData.email = sessionDetails.id
    }else{
      formData.phonenumber = sessionDetails.id
    }
    twoFactor(formData);
  };

  const handleChange = (otp) => {
    setOtpValue(otp)
    otp.length === 6 ? setHasFieldError(false) : setHasFieldError(true)
  }

  const pasteCode = async() => {
    const text = await navigator.clipboard.readText();
    setOtpValue(text)
  }

  return (
    <Form
      ref={formRef}
      onFinish={onSubmit}
      onFieldsChange={onFormChange}
      autoComplete="off"
    >
      <div className="content">
        <OTPBox value={otpValue} numInputs={6} handleChange={handleChange}/>
        <div className="botton-box">
          <div className="paste-btn" onClick={()=>pasteCode()}>
            {t("forgot.paste")}
            <Icon.PasteIcon fill={`${({theme}) => theme.color.primary}`}/>
          </div>
        </div>
        <Button
          htmlType="submit"
          disabled={isLoading || hasFieldError}
          className="sign-in-btn"
          type="primary"
        >
          {t("common.verify")}
        </Button>
      </div>
    </Form>
  );
}

export default VerifyOTPForm;
