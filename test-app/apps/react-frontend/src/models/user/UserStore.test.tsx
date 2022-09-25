import React from "react";
import { INITIAL_USER, Roles, User } from "./User";
import { fireEvent, RenderResult, screen } from "@testing-library/react";
import { modifyUser, createNewUser, UserContext, resetUser } from "./UserStore";
import { objParser, objStringifier } from "../../test-utils/object-utils";
import { renderWithUser } from "../../test-utils/user-utils";

const TestComp = () => {
  const { user, dispatch } = React.useContext(UserContext);
  const [val, setVal] = React.useState("");
  const [propVal, setPropVal] = React.useState("");
  const [newUserObj, setNewUserObj] = React.useState<string>("");

  const changePropVal = () => {
    modifyUser({ [propVal]: val }, dispatch);
  };

  const modifyUserObj = () => {
    modifyUser(objParser<Partial<User>>(newUserObj), dispatch);
  };

  const setUserObj = () => {
    createNewUser(objParser(newUserObj), dispatch);
  };

  return (
    <React.Fragment>
      <p>User obj: {objStringifier(user)}</p>
      <p>Hello, {user.name}!</p>
      <p>Hello, {val}!</p>
      <label>Property to change</label>
      <input aria-label="prop-input" onChange={(e) => setPropVal(e.target.value)} />
      <label>Property value</label>
      <input aria-label="prop-val-input" onChange={(e) => setVal(e.target.value)} />
      <button onClick={changePropVal}>Try it!</button>
      <input aria-label="user-obj-input" onChange={(e) => setNewUserObj(e.target.value)} />
      <button onClick={modifyUserObj}>Modify user obj</button>
      <button onClick={setUserObj}>Set user obj</button>
      <button onClick={() => resetUser(dispatch)}>Reset user obj</button>
    </React.Fragment>
  );
};

// https://testing-library.com/docs/example-input-event
describe("UserStore provider", () => {
  const TEST_EMAIL = "my-custom-email@email.com";
  const TEST_NAME = "my-custom-name";

  let testComp: RenderResult;
  let propInput: HTMLInputElement;
  let propValInput: HTMLInputElement;
  let userObjInput: HTMLInputElement;

  const expectUserEquivalence = (expectedObj: Partial<User>) => {
    const expectedObject = objParser(objStringifier(expectedObj));
    const userObjDisplayed = screen.getByText("User obj:", { exact: false }).innerHTML;

    const renderedUserObj = objParser(userObjDisplayed.split("User obj: ")[1]);
    expect(renderedUserObj).toEqual(expectedObject);
  };

  beforeEach(() => {
    testComp = renderWithUser(<TestComp />);
    propInput = testComp.getByLabelText("prop-input") as HTMLInputElement;
    propValInput = testComp.getByLabelText("prop-val-input") as HTMLInputElement;
    userObjInput = testComp.getByLabelText("user-obj-input") as HTMLInputElement;
  });

  it("should have User initialized with default values", () => {
    expectUserEquivalence(INITIAL_USER);
  });

  it("should have User name changed", () => {
    fireEvent.change(propInput, { target: { value: "name" } });
    fireEvent.change(propValInput, { target: { value: TEST_NAME } });

    const changeBtn = screen.getByText("Try it!");
    fireEvent.click(changeBtn);

    expectUserEquivalence({
      ...INITIAL_USER,
      name: TEST_NAME,
    });
  });

  it("should have User email changed", () => {
    fireEvent.change(propInput, { target: { value: "name" } });
    fireEvent.change(propValInput, { target: { value: TEST_EMAIL } });

    const changeBtn = screen.getByText("Try it!");
    fireEvent.click(changeBtn);

    expectUserEquivalence({
      ...INITIAL_USER,
      name: TEST_EMAIL,
    });
  });

  it("should have User name, email, and role changed", () => {
    const testObj: Partial<User> = {
      name: TEST_NAME,
      email: TEST_EMAIL,
      role: Roles.ADMIN,
    };

    fireEvent.change(userObjInput, { target: { value: objStringifier(testObj) } });

    const changeBtn = screen.getByText("Modify user obj");
    fireEvent.click(changeBtn);

    expectUserEquivalence({
      ...INITIAL_USER,
      ...testObj,
    });
  });

  it("should have User name and role changed (when modified from existing state)", () => {
    const testObj: Partial<User> = {
      name: TEST_NAME,
      email: TEST_EMAIL,
      role: Roles.ADMIN,
    };

    fireEvent.change(userObjInput, { target: { value: objStringifier(testObj) } });

    const changeBtn = screen.getByText("Modify user obj");
    fireEvent.click(changeBtn);

    const newObj: Partial<User> = {
      name: TEST_NAME + "extra",
      role: Roles.VOLUNTEER,
    };

    fireEvent.change(userObjInput, { target: { value: objStringifier(newObj) } });
    fireEvent.click(changeBtn);

    expectUserEquivalence({
      ...INITIAL_USER,
      ...testObj, // Notice this comes after INITIAL_USER
      ...newObj,
    });
  });

  it("should have entire user object changed", () => {
    fireEvent.change(propInput, { target: { value: "name" } });
    fireEvent.change(propValInput, { target: { value: TEST_NAME } });

    let changeBtn = screen.getByText("Try it!");
    fireEvent.click(changeBtn);

    const testObj: Partial<User> = {
      email: TEST_EMAIL,
      userId: 8,
      role: Roles.VOLUNTEER,
      userApproved: true,
      cognitoSession: {
        idToken: "some-token",
      },
    };

    fireEvent.change(userObjInput, { target: { value: objStringifier(testObj) } });

    changeBtn = screen.getByText("Set user obj");
    fireEvent.click(changeBtn);

    // Name should get reset to initial user's name (empty string)
    expectUserEquivalence({
      ...INITIAL_USER,
      ...testObj,
    });
  });

  it("should have reset User stored", () => {
    const testObj: Partial<User> = {
      email: TEST_EMAIL,
      userId: 8,
      role: Roles.VOLUNTEER,
      userApproved: true,
      cognitoSession: {
        idToken: "some-token",
      },
    };

    fireEvent.change(userObjInput, { target: { value: objStringifier(testObj) } });
    const changeBtn = screen.getByText("Set user obj");
    fireEvent.click(changeBtn);

    const resetBtn = screen.getByText("Reset user obj");
    fireEvent.click(resetBtn);

    // Everything should be reset
    expectUserEquivalence(INITIAL_USER);
  });
});
