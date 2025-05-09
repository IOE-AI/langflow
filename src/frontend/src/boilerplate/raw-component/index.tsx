import { useTranslation } from "react-i18next";

type RawComponentProps = {};
const RawComponent = ({}: RawComponentProps) => {
  const { t } = useTranslation();
  return (
    <>
      <div>{t('boilerplate.raw_component')}</div>
    </>
  );
};
export default RawComponent;
