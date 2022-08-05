import { CustomForm, CustomFormEvent } from 'src/forms/form/Form';
import { personalInfoSchema } from 'src/forms/schema';

function PersonalInfo() {
  // TODO-rtotale: Submit personal info
  const onSubmitPersonalInfo: (event: CustomFormEvent) => void = (event) => console.log(event.formData);

  return (
    <CustomForm schema={personalInfoSchema} onSubmit={onSubmitPersonalInfo}/>
  );
}

export default PersonalInfo;
