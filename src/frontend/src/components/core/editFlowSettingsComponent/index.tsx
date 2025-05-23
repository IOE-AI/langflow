import React, { ChangeEvent, useState } from "react";
import { InputProps } from "../../../types/components";
import { cn, isEndpointNameValid } from "../../../utils/utils";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";
import { useTranslation } from "react-i18next";

export const EditFlowSettings: React.FC<InputProps> = ({
  name,
  invalidNameList = [],
  description,
  endpointName,
  maxLength = 50,
  setName,
  setDescription,
  setEndpointName,
}: InputProps): JSX.Element => {
  const [isMaxLength, setIsMaxLength] = useState(false);
  const [validEndpointName, setValidEndpointName] = useState(true);
  const [isInvalidName, setIsInvalidName] = useState(false);
  const { t } = useTranslation();

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (value.length >= maxLength) {
      setIsMaxLength(true);
    } else {
      setIsMaxLength(false);
    }
    let invalid = false;
    for (let i = 0; i < invalidNameList!.length; i++) {
      if (value === invalidNameList![i]) {
        invalid = true;
        break;
      }
      invalid = false;
    }
    setIsInvalidName(invalid);
    setName!(value);
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription!(event.target.value);
  };

  const handleEndpointNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    // Validate the endpoint name
    // use this regex r'^[a-zA-Z0-9_-]+$'
    const isValid = isEndpointNameValid(event.target.value, maxLength);
    setValidEndpointName(isValid);
    setEndpointName!(event.target.value);
  };

  //this function is necessary to select the text when double clicking, this was not working with the onFocus event
  const handleFocus = (event) => event.target.select();

  return (
    <>
      <Label>
        <div className="edit-flow-arrangement">
          <span className="font-medium">{t('edit_flow_settings.name')}{setName ? "" : ":"}</span>{" "}
          {isMaxLength && (
            <span className="edit-flow-span">{t('edit_flow_settings.character_limit_reached')}</span>
          )}
          {isInvalidName && (
            <span className="edit-flow-span">{t('edit_flow_settings.name_invalid_or_exists')}</span>
          )}
        </div>
        {setName ? (
          <Input
            className="nopan nodelete nodrag noflow mt-2 font-normal"
            onChange={handleNameChange}
            type="text"
            name="name"
            value={name ?? ""}
            placeholder={t('edit_flow_settings.flow_name')}
            id="name"
            maxLength={maxLength}
            onDoubleClickCapture={(event) => {
              handleFocus(event);
            }}
            data-testid="input-flow-name"
          />
        ) : (
          <span className="font-normal text-muted-foreground word-break-break-word">
            {name}
          </span>
        )}
      </Label>
      <Label>
        <div className="edit-flow-arrangement mt-3">
          <span className="font-medium">{t(setDescription ? 'edit_flow_settings.description_optional' : 'edit_flow_settings.description')}:</span>
        </div>
        {setDescription ? (
          <Textarea
            name="description"
            id="description"
            onChange={handleDescriptionChange}
            value={description!}
            placeholder={t('edit_flow_settings.flow_description')}
            className="mt-2 max-h-[250px] resize-none font-normal"
            rows={5}
            onDoubleClickCapture={(event) => {
              handleFocus(event);
            }}
          />
        ) : (
          <div
            className={cn(
              "max-h-[250px] overflow-auto pt-2 font-normal text-muted-foreground word-break-break-word",
              description === "" ? "font-light italic" : "",
            )}
          >
            {description === "" ? t('edit_flow_settings.no_description') : description}
          </div>
        )}
      </Label>
      {setEndpointName && (
        <Label>
          <div className="edit-flow-arrangement mt-3">
            <span className="font-medium">{t('edit_flow_settings.endpoint_name')}</span>
            {!validEndpointName && (
              <span className="edit-flow-span">{t('edit_flow_settings.invalid_endpoint_name', { maxLength })}</span>
            )}
          </div>
          <Input
            className="nopan nodelete nodrag noflow mt-2 font-normal"
            onChange={handleEndpointNameChange}
            type="text"
            name="endpoint_name"
            value={endpointName ?? ""}
            placeholder={t('edit_flow_settings.endpoint_placeholder')}
            maxLength={maxLength}
            id="endpoint_name"
            onDoubleClickCapture={(event) => {
              handleFocus(event);
            }}
          />
        </Label>
      )}
    </>
  );
};

export default EditFlowSettings;
