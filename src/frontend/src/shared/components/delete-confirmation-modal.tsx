import ForwardedIconComponent from "@/components/common/genericIconComponent";
import {
  useDeleteGlobalVariables,
  useGetGlobalVariables,
} from "@/controllers/API/queries/variables";
import DeleteConfirmationModal from "@/modals/deleteConfirmationModal";
import useAlertStore from "@/stores/alertStore";
import { cn } from "@/utils/utils";
import { useTranslation } from "react-i18next";

interface GeneralDeleteConfirmationModalProps {
  option: string;
  onConfirmDelete: () => void;
}

const GeneralDeleteConfirmationModal = ({
  option,
  onConfirmDelete,
}: GeneralDeleteConfirmationModalProps) => {
  const setErrorData = useAlertStore((state) => state.setErrorData);
  const { mutate: mutateDeleteGlobalVariable } = useDeleteGlobalVariables();
  const { data: globalVariables } = useGetGlobalVariables();
  const { t } = useTranslation();

  async function handleDelete(key: string) {
    if (!globalVariables) return;
    const id = globalVariables.find((variable) => variable.name === key)?.id;
    if (id !== undefined) {
      mutateDeleteGlobalVariable(
        { id },
        {
          onSuccess: () => {
            onConfirmDelete();
          },
          onError: () => {
            setErrorData({
              title: t('deleteConfirmationModal.errorTitle'),
              list: [t('deleteConfirmationModal.idNotFound', { key })],
            });
          },
        },
      );
    } else {
      setErrorData({
        title: t('deleteConfirmationModal.errorTitle'),
        list: [t('deleteConfirmationModal.idNotFound', { key })],
      });
    }
  }

  return (
    <>
      <DeleteConfirmationModal
        onConfirm={(e) => {
          e.stopPropagation();
          e.preventDefault();
          handleDelete(option);
        }}
        description={t('deleteConfirmationModal.variable', { option })}
        asChild
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="pr-1"
        >
          <ForwardedIconComponent
            name="Trash2"
            className={cn(
              "h-4 w-4 text-primary opacity-0 hover:text-status-red group-hover:opacity-100",
            )}
            aria-hidden="true"
          />
        </button>
      </DeleteConfirmationModal>
    </>
  );
};

export default GeneralDeleteConfirmationModal;
