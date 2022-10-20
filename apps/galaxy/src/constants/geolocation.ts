export enum StateEnum {
  NSW = "NSW",
  VIC = "VIC",
  QLD = "QLD",
  SA = "SA",
  WA = "WA",
  TAS = "TAS",
  NT = "NT",
  ACT = "ACT",
}
export const stateList = (Object.keys(StateEnum) as (keyof typeof StateEnum)[]).map((key) => {
  return StateEnum[key];
});
