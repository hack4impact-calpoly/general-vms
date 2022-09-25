import { ErrorDialog } from "../../../dialogs/error-dialog/ErrorDialog";
import { Alert } from "@mui/material";
import { CustomWebError } from "../CustomWebError";
import { DataLoaderDefaultErrorComponent } from "../../../DataLoader/DataLoader";

const FOUR_HUNDREDS_EXTRA_PART = "Please contact a site admin if you believe this is incorrect";

interface IProps {
  error?: Error;
}

function HttpRequestDataLoaderErrorComponent({ error }: IProps) {
  let generalMessage: string;
  let title: string;

  console.error("======== Received HTTP request error ==========");

  if (!(error instanceof CustomWebError)) {
    console.error(error);
    return <DataLoaderDefaultErrorComponent />;
  } else {
    console.error("Special custom web error response: " + error.responseError);
    switch (error.responseCode) {
      case 401:
        title = "Are you logged in?";
        generalMessage = `You are not logged in! Login and try again. ${FOUR_HUNDREDS_EXTRA_PART}`;
        break;
      case 403:
        title = "Action Forbidden";
        generalMessage = `Your account is not allowed to perform this action. ${FOUR_HUNDREDS_EXTRA_PART}`;
        break;
      case 404:
        title = "Item Not Found";
        generalMessage = "The item requested could not be found.";
        break;
      default:
        title = "An unexpected error occurred";
        generalMessage = `This action failed due to an unexpected error. If this continues, please contact a site admin`;
    }
  }

  return (
    <>
      <ErrorDialog open={true} errorTitle={title} errorMessage={generalMessage} />
      <Alert severity="error">Request failed: {generalMessage}</Alert>
    </>
  );
}

export default HttpRequestDataLoaderErrorComponent;
