import ForwardedIconComponent from "@/components/common/genericIconComponent";
import { Button } from "@/components/ui/button";
import { useFolderStore } from "@/stores/foldersStore";
import { useTranslation } from 'react-i18next';

type EmptyFolderProps = {
  setOpenModal: (open: boolean) => void;
};

export const EmptyFolder = ({ setOpenModal }: EmptyFolderProps) => {
  const { t } = useTranslation();
  const folders = useFolderStore((state) => state.folders);

  return (
    <div className="m-0 flex w-full justify-center">
      <div className="absolute top-1/2 flex w-full -translate-y-1/2 flex-col items-center justify-center gap-2">
        <h3
          className="pt-5 font-chivo text-2xl font-semibold"
          data-testid="mainpage_title"
        >
          {folders?.length > 1 ? t('empty_project') : t('start_building')}
        </h3>
        <p className="pb-5 text-sm text-secondary-foreground">
          {t('begin_with_template')}
        </p>
        <Button
          variant="default"
          onClick={() => setOpenModal(true)}
          id="new-project-btn"
        >
          <ForwardedIconComponent
            name="plus"
            aria-hidden="true"
            className="h-4 w-4"
          />
          <span className="whitespace-nowrap font-semibold">{t('new_flow')}</span>
        </Button>
      </div>
    </div>
  );
};

export default EmptyFolder;
