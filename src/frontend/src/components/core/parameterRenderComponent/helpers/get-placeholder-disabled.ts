import {
  DEFAULT_PLACEHOLDER,
  RECEIVING_INPUT_VALUE,
} from "@/constants/constants";
import { useTranslation } from "react-i18next";

export const getPlaceholder = (
  disabled: boolean,
  returnMessage: string = DEFAULT_PLACEHOLDER,
) => {
  const { t } = useTranslation();
  if (disabled) return t('dropdown.receiving_input');
  return returnMessage ?? t('dropdown.choose_option');
};
