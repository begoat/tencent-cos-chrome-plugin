import React, { useState, useCallback } from 'react';
import {
  Form,
  FormGroup,
  ControlLabel,
  HelpBlock,
  FormControl,
  ButtonToolbar,
  Button,
  Schema,
  Alert,
} from 'rsuite';

import { getEnvInfo, setEnvInfo, EnvInfo } from './utils';

const { StringType } = Schema.Types;
const model = Schema.Model({
  secretId: StringType().isRequired('SecretId is required.'),
  secretKey: StringType().isRequired('SecretKey is required.'),
  bucket: StringType().isRequired('Bucket is required.'),
  region: StringType().isRequired('Region is required.'),
});

export const Env = (): JSX.Element => {
  const [formData, setFormData] = useState<EnvInfo>(
    getEnvInfo() || {
      secretId: '',
      secretKey: '',
      bucket: '',
      region: '',
    }
  );

  const handleSubmit = useCallback(() => {
    Alert.success('Env info Saved');
    setEnvInfo(formData);
    location.replace(SUBPATH ? SUBPATH : '/');
  }, [formData]);

  const handleReset = useCallback(() => {
    Alert.success('Env info Reset');
    setFormData(getEnvInfo());
  }, []);

  return (
    <Form
      className="env-form"
      model={model}
      formValue={formData}
      onChange={setFormData}
      onSubmit={handleSubmit}
    >
      <FormGroup>
        <ControlLabel>secretId</ControlLabel>
        <FormControl name="secretId" />
        <HelpBlock>Required</HelpBlock>
      </FormGroup>
      <FormGroup>
        <ControlLabel>secretKey</ControlLabel>
        <FormControl name="secretKey" />
        <HelpBlock tooltip>Required</HelpBlock>
      </FormGroup>
      <FormGroup>
        <ControlLabel>bucket</ControlLabel>
        <FormControl name="bucket" />
      </FormGroup>
      <FormGroup>
        <ControlLabel>region</ControlLabel>
        <FormControl name="region" />
      </FormGroup>
      <FormGroup>
        <ButtonToolbar>
          <Button appearance="primary" type="submit">
            Submit
          </Button>
          <Button appearance="default" onClick={handleReset}>
            Reset
          </Button>
        </ButtonToolbar>
      </FormGroup>
    </Form>
  );
};
