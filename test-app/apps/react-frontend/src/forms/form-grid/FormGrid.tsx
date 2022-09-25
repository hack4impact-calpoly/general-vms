import { IFormMetadataView } from "@general-vms/shared";
import { FormCard } from "../form-card/FormCard";
import "./FormGrid.scss";

interface IProps {
  title: string;
  forms: IFormMetadataView[];
  showOptionsMenu: boolean;
  showViewableStatus: boolean;
}

const NoForms = ({ title }: { title: string }) => {
  return (
    <p style={{ textAlign: "center", width: "100%" }}>
      <i>There are currently no {title.toLowerCase()}</i>
    </p>
  );
};

export const FormGrid = ({ title, forms, ...formCardProps }: IProps) => {
  return (
    <div
      data-testid={`form-grid-${title.toLowerCase().split(" ").join("-")}`}
      className="form-view-grid-holder"
    >
      <h2>{title}</h2>
      {forms.length === 0 ? (
        <NoForms title={title} />
      ) : (
        <section className="form-view-grid">
          {forms.map((form, index) => (
            <FormCard key={`form-${index}`} form={form} {...formCardProps} />
          ))}
        </section>
      )}
    </div>
  );
};
