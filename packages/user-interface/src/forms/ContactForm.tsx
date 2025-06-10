// import TextInput from "@gemeente-denhaag/text-input";
// import Form from "../components/Form";
// import useInput from "../hooks/useInput";
// import FormLabel from "@gemeente-denhaag/form-label";
// import FormField from "@gemeente-denhaag/form-field";
// import FormFieldErrorMessage from "@gemeente-denhaag/form-field-error-message";
// import { FormattedMessage } from "react-intl";

// interface ContactFormProps {
//   formId: string;
//   type: "email" | "tel";
//   validationRegex: RegExp;
//   currentValue?: string;
//   onSubmit: (value?: string) => void;
// }

// const ContactForm = ({
//   formId,
//   type,
//   validationRegex,
//   currentValue = "",
//   onSubmit,
// }: ContactFormProps) => {
//   const {
//     value: phoneValue,
//     handleInputChange: handlePhoneInputChange,
//     handleInputBlur: handlePhoneInputBlur,
//     hasError: phoneHasError,
//     errorTranslationId: phoneErrorTranslationId,
//   } = useInput(currentValue, [
//     {
//       validationFn: (value) => validationRegex.test(value),
//       errorTranslationId: "",
//     },
//   ]);
//   const {
//     value: emailValue,
//     handleInputChange: handleEmailInputChange,
//     handleInputBlur: handleEmailInputBlur,
//     hasError: emailHasError,
//     errorTranslationId: emailErrorTranslationId,
//   } = useInput(currentValue, [
//     {
//       validationFn: (value) => validationRegex.test(value),
//       errorTranslationId: "",
//     },
//   ]);
//   return (
//     <Form
//       id={formId}
//       onSubmit={(event) => {
//         event.preventDefault();
//         onSubmit(value);
//       }}
//     >
//       <FormField invalid={hasError}>
//         <FormLabel>
//           <FormattedMessage id={`account.detail.contactform.${type}`} />
//         </FormLabel>
//         <TextInput
//           type={type}
//           name={type}
//           value={value}
//           onChange={handleInputChange}
//           onBlur={handleInputBlur}
//         />
//         {hasError && (
//           <FormFieldErrorMessage>
//             <FormattedMessage id={errorTranslationId} />
//           </FormFieldErrorMessage>
//         )}
//       </FormField>
//     </Form>
//   );
// };

// export default ContactForm;
