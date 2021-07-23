import { mount, shallow } from "enzyme";
import ModalWindow from "../modalWindow.component";

describe("ModalWindow Component Test", () => {
  test("Should be rendered ", async () => {
    const component = shallow(
      <ModalWindow
        visible={true}
        title={"this.state.modalTitle"}
        content={"this.state.modalContent"}
        footer={
          <div>
            <button className="btn btn-secondary" onClick={jest.fn()}>
              OK
            </button>
          </div>
        }
        onClose={jest.fn()}
      />
    );
    await component.update();
    expect(component.find("div").length).toEqual(8);
  });
});
