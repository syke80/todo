import { mockDate } from "../testing/mocks";
import { getFormattedCurrentDate } from "./date.helper";

describe("getFormattedCurrentDate", () => {
  let resetDateMock: Function;

  beforeEach(() => {
    const time = new Date("2021-10-20T00:00:01.30Z");
    resetDateMock = mockDate(time);
  });

  afterEach(() => {
    resetDateMock();
  });

  it("should return the current date in dd-mm-yyyy format", () => {
    const result = getFormattedCurrentDate();
    expect(result).toEqual("20-10-2021");
  });
});
