import { track } from "@/customization/utils/analytics";
import useFlowStore from "@/stores/flowStore";
import { ReactNode, forwardRef, useEffect, useState } from "react";
import IconComponent from "../../components/common/genericIconComponent";
import EditFlowSettings from "../../components/core/editFlowSettingsComponent";
import { Checkbox } from "../../components/ui/checkbox";
import { API_WARNING_NOTICE_ALERT } from "../../constants/alerts_constants";
import {
  ALERT_SAVE_WITH_API,
  EXPORT_DIALOG_SUBTITLE,
  SAVE_WITH_API_CHECKBOX,
} from "../../constants/constants";
import useAlertStore from "../../stores/alertStore";
import { useDarkStore } from "../../stores/darkStore";
import { downloadFlow, removeApiKeys } from "../../utils/reactflowUtils";
import BaseModal from "../baseModal";
import { useTranslation } from "react-i18next";

const ExportModal = forwardRef(
  (props: { children: ReactNode }, ref): JSX.Element => {
    const { t } = useTranslation();
    const version = useDarkStore((state) => state.version);
    const setNoticeData = useAlertStore((state) => state.setNoticeData);
    const [checked, setChecked] = useState(false);
    const currentFlow = useFlowStore((state) => state.currentFlow);
    const isBuilding = useFlowStore((state) => state.isBuilding);
    useEffect(() => {
      setName(currentFlow?.name ?? "");
      setDescription(currentFlow?.description ?? "");
    }, [currentFlow?.name, currentFlow?.description]);
    const [name, setName] = useState(currentFlow?.name ?? "");
    const [description, setDescription] = useState(
      currentFlow?.description ?? "",
    );
    const [open, setOpen] = useState(false);
    return (
      <BaseModal
        size="smaller-h-full"
        open={open}
        setOpen={setOpen}
        onSubmit={() => {
          if (checked) {
            downloadFlow(
              {
                id: currentFlow!.id,
                data: currentFlow!.data!,
                description,
                name,
                last_tested_version: version,
                endpoint_name: currentFlow!.endpoint_name,
                is_component: false,
                tags: currentFlow!.tags,
              },
              name!,
              description,
            );
            setNoticeData({
              title: t('constants.alertSaveWithApi'),
            });
          } else
            downloadFlow(
              removeApiKeys({
                id: currentFlow!.id,
                data: currentFlow!.data!,
                description,
                name,
                last_tested_version: version,
                endpoint_name: currentFlow!.endpoint_name,
                is_component: false,
                tags: currentFlow!.tags,
              }),
              name!,
              description,
            );
          setOpen(false);
          track("Flow Exported", { flowId: currentFlow!.id });
        }}
      >
        <BaseModal.Trigger asChild>{props.children}</BaseModal.Trigger>
        <BaseModal.Header description={t('constants.exportDialogSubtitle')}>
          <span className="pr-2">{t('export')}</span>
          <IconComponent
            name="Download"
            className="h-6 w-6 pl-1 text-foreground"
            aria-hidden="true"
          />
        </BaseModal.Header>
        <BaseModal.Content>
          <EditFlowSettings
            name={name}
            description={description}
            setName={setName}
            setDescription={setDescription}
          />
          <div className="mt-3 flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={checked}
              onCheckedChange={(event: boolean) => {
                setChecked(event);
              }}
            />
            <label htmlFor="terms" className="export-modal-save-api text-sm">
              {t('constants.saveWithApiCheckbox')}
            </label>
          </div>
          <span className="mt-1 text-xs text-destructive">
            {t('alerts.apiWarningNotice')}
          </span>
        </BaseModal.Content>

        <BaseModal.Footer submit={{ label: t('export'), loading: isBuilding }} />
      </BaseModal>
    );
  },
);
export default ExportModal;
