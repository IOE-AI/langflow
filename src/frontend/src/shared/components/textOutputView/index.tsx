import { Textarea } from "../../../components/ui/textarea";
import { useTranslation } from "react-i18next";

const TextOutputView = ({
  left,
  value,
}: {
  left: boolean | undefined;
  value: any;
}) => {
  const { t } = useTranslation();

  if (typeof value === "object" && Object.keys(value).includes("text")) {
    value = value.text;
  }

  const isTruncated = value?.length > 20000;

  return (
    <>
      {" "}
      <Textarea
        className={`w-full custom-scroll ${left ? "min-h-32" : "h-full"}`}
        placeholder={t('textOutputView.empty')}
        readOnly
        // update to real value on flowPool
        value={value}
      />
      {isTruncated && (
        <div className="mt-2 text-xs text-muted-foreground">
          {t('textOutputView.truncated')}
        </div>
      )}
    </>
  );
};

export default TextOutputView;
