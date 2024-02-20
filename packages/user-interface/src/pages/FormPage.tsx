import { FC, useContext, useEffect } from "react";
import { useScript } from "usehooks-ts";
import { Helmet } from "react-helmet-async";
import { formatUrlTrailingSlash } from "@nl-portal/nl-portal-authentication";
import { useParams } from "react-router-dom";
import LayoutContext from "../contexts/LayoutContext";

// eslint-disable-next-line
declare const OpenForms: any;

interface FormPageProps {
  openFormsBaseUrl: string;
  openFormsEntryEnv: string;
  openFormsSdkUrl: string;
  openFormsStylesUrl: string;
}

const FormPage: FC<FormPageProps> = ({
  openFormsBaseUrl,
  openFormsEntryEnv,
  openFormsSdkUrl,
  openFormsStylesUrl,
}) => {
  const {
    enableFullscreenForm,
    disableFullscreenForm,
    setCurrentFormTitle,
    clearCurrentFormTitle,
  } = useContext(LayoutContext);
  const openFormsScript = useScript(
    formatUrlTrailingSlash(openFormsSdkUrl, false),
  );
  const { id } = useParams<{ id: string }>();
  const FORM_ID_LOCAL_STORAGE_KEY = "FORM_ID";

  useEffect(() => {
    enableFullscreenForm();

    if (id) {
      localStorage.setItem(FORM_ID_LOCAL_STORAGE_KEY, id);
    }

    return () => {
      disableFullscreenForm();
      clearCurrentFormTitle();
    };
  }, []);

  useEffect(() => {
    if (typeof OpenForms !== "undefined") {
      const localStorageFormId = localStorage.getItem(
        FORM_ID_LOCAL_STORAGE_KEY,
      );
      const formId = id || localStorageFormId || "";
      const baseUrl = formatUrlTrailingSlash(openFormsBaseUrl, true);
      const basePath = `/formulier/${formId}`;
      const targetNode = document.getElementById("openforms\u002Dcontainer");
      const sentryEnv = openFormsEntryEnv;
      const form = new OpenForms.OpenForm(targetNode, {
        baseUrl,
        formId,
        basePath,
        sentryEnv,
      });

      form.init();

      const checkFormName = () => {
        const formName = form?.formObject?.name;

        if (formName) {
          setCurrentFormTitle(formName);
        } else {
          setTimeout(checkFormName, 250);
        }
      };

      checkFormName();
    }
  }, [openFormsScript]);

  return (
    <div>
      <Helmet>
        <link
          href={formatUrlTrailingSlash(openFormsStylesUrl, false)}
          rel="stylesheet"
        />
      </Helmet>
      <div id="openforms-container" />
    </div>
  );
};
export default FormPage;
