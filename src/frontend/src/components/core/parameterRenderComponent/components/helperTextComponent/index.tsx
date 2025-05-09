import ForwardedIconComponent from "@/components/common/genericIconComponent";
import { cn } from "@/utils/utils";
import { useTranslation } from "react-i18next";

type HelperTextComponentProps = {
  helperText: string;
  helperMetadata?: { icon: string | undefined; variant: string };
};

const HelperTextComponent = ({
  helperText,
  helperMetadata = { icon: undefined, variant: "muted-foreground" },
}: HelperTextComponentProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex w-full flex-row items-center gap-2">
      {helperMetadata?.icon && (
        <ForwardedIconComponent
          name={helperMetadata?.icon}
          className={cn(
            `h-5 w-5`,
            helperMetadata?.variant && `text-${helperMetadata?.variant}`,
          )}
        />
      )}
      <div
        className={cn(
          "flex w-full flex-col text-xs",
          helperMetadata?.variant && `text-${helperMetadata?.variant}`,
        )}
      >
        {t(helperText)}
      </div>
    </div>
  );
};

export default HelperTextComponent;
