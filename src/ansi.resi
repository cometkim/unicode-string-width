type state =
  | @as(0) Idle
  | @as(1) Esc
  | @as(2) InProgress
  | @as(3) AwaitST
  | @as(4) Finished

let ansiState: (state, char) => state
