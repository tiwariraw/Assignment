import { Formik, Form, Field, ErrorMessage } from "formik";
import { auth, googleProvider, facebookProvider } from "../../utils/auth";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Login.css";
import { FaGoogle, FaFacebookF } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      toast.success("Login successfull");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Signed in with Google");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      await signInWithPopup(auth, facebookProvider);
      toast.success("Signed in with Facebook");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handlePasswordReset = async () => {
    const email = prompt("Enter your email for resetting your password");
    if (email) {
      try {
        await sendPasswordResetEmail(auth, email);
        toast.success("Email sent for resetting the password");
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="bg-container">
      <div className="auth-container">
        <h2>Login</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <label>Email:</label>
              <Field type="email" name="email" />
              <ErrorMessage name="email" component="div" className="error" />

              <label>Password:</label>
              <Field type="password" name="password" />
              <ErrorMessage name="password" component="div" className="error" />

              <button type="submit" disabled={isSubmitting}>
                Login
              </button>

              <div className="signup-text">
                <p>
                  New to BookWizard ?{"  "}
                  <span
                    className="signup-btn"
                    onClick={() => navigate("/signup")}
                  >
                    Sign up
                  </span>
                </p>
              </div>
            </Form>
          )}
        </Formik>

        <div className="social-login">
          <button className="google" onClick={handleGoogleSignIn}>
            <FaGoogle className="icon" />
            Login with Google
          </button>
          <button className="facebook" onClick={handleFacebookSignIn}>
            <FaFacebookF className="icon" />
            Login with Facebook
          </button>
        </div>

        <div className="forgot-password">
          <button onClick={handlePasswordReset}>Forgot Password?</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
