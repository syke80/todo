export const mockDate = (expected: Date) => {
  const OriginalDate = Date;

  function MockDate(mockOverride?: Date | number) {
    return new OriginalDate(mockOverride || expected);
  }

  MockDate.UTC = OriginalDate.UTC;
  MockDate.parse = OriginalDate.parse;
  MockDate.now = () => expected.getTime();
  MockDate.prototype = OriginalDate.prototype;

  Date = MockDate as any;

  // Callback function to remove the Date mock
  return () => {
    Date = OriginalDate;
  };
};
