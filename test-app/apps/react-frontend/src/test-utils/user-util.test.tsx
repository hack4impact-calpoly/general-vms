import React from "react";
import { INITIAL_USER, Roles, User } from "../models/user/User";
import { screen, render } from "@testing-library/react";
import { UserContext, UserProvider } from "../models/user/UserStore";
import { objParser, objStringifier } from "./object-utils";
import { renderWithUser } from "./user-utils";

const BasicProviderWrapper = () => (
  <UserProvider>
    <TestComp />
  </UserProvider>
);

const TestComp = () => {
  const { user } = React.useContext(UserContext);

  return <p>User obj: {objStringifier(user)}</p>;
};

// https://testing-library.com/docs/example-input-event
describe("User utility (for tests)", () => {
  const TEST_USER_OBJ: Partial<User> = {
    role: Roles.VOLUNTEER,
    name: "JEFF",
  };

  const expectUserEquivalence = (expectedObj: Partial<User>) => {
    const expectedObject = objParser<Partial<User>>(objStringifier(expectedObj));
    const userObjDisplayed = screen.getByText("User obj:", { exact: false }).innerHTML;

    const renderedUserObj = objParser<Partial<User>>(userObjDisplayed.split("User obj: ")[1]);
    expect(renderedUserObj).toEqual(expectedObject);
  };

  it("should render default user with everything uninitialized when NOT using custom renderer", () => {
    render(<BasicProviderWrapper />);
    expectUserEquivalence(INITIAL_USER);
  });

  it("should render default user with everything uninitialized when not providing custom user", () => {
    renderWithUser(<TestComp />);
    expectUserEquivalence(INITIAL_USER);
  });

  it("should render default user with custom props", () => {
    renderWithUser(<TestComp />, {
      userProviderProps: {
        customUser: TEST_USER_OBJ,
      },
    });

    expectUserEquivalence({
      ...INITIAL_USER,
      ...TEST_USER_OBJ,
    });
  });
});
