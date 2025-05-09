import { useTranslation } from "react-i18next";
import IconComponent from "../../../common/genericIconComponent";

export default function Error(): JSX.Element {
  const { t } = useTranslation();
  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-muted">
      <div className="chat-alert-box">
        <span className="flex gap-2">
          <IconComponent name="FileX2" />
          <span className="langflow-chat-span">{t('constants.pdfLoadErrorTitle')}</span>
        </span>
        <br />
        <div className="chatflow-chat-desc">
          <span className="langflow-chat-desc-span">{t('constants.pdfCheckFlow')} </span>
        </div>
      </div>
    </div>
  );
}
