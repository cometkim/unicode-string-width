type state =
  | @as(0) Idle
  | @as(1) Esc
  | @as(2) InProgress
  | @as(3) AwaitST
  | @as(4) Finished

let isIntermediate = ch => {
  switch ch {
  | '[' | ']' | '(' | ')' | '#' | ';' | '?' => true
  | _ => false
  }
}

let isParameter = ch => {
  switch ch {
  | '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | ';' => true
  | _ => false
  }
}

let isFinal = ch => {
  switch ch {
  | '0'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | 'A'
  | 'B'
  | 'C'
  | 'D'
  | 'E'
  | 'F'
  | 'G'
  | 'H'
  | 'I'
  | 'J'
  | 'K'
  | 'L'
  | 'M'
  | 'N'
  | 'O'
  | 'P'
  | 'R'
  | 'S'
  | 'T'
  | 'U'
  | 'V'
  | 'W'
  | 'X'
  | 'Y'
  | 'Z'
  | 'a'
  | 'c'
  | 'f'
  | 'n'
  | 'q'
  | 'u'
  | 'y'
  | '='
  | '<'
  | '>'
  | '~' => true
  | _ => false
  }
}

let ansiState = (state, ch) => {
  switch (state, ch) {
  | (Idle, '\x1B' | '\x9B') => Esc
  | (Idle, _) => Idle
  | (Esc, '\x07' | '\x9C') => Finished
  | (Esc, '\x1B') => AwaitST
  | (Esc, ch) if isIntermediate(ch) => InProgress
  | (Esc, ch) if isParameter(ch) => InProgress
  | (Esc, ch) if isFinal(ch) => Finished
  | (Esc, _) => InProgress
  | (InProgress, '\x07' | '\x9C') => Finished
  | (InProgress, '\x1B') => AwaitST
  | (InProgress, ch) if isFinal(ch) => Finished
  | (InProgress, _) => InProgress
  | (AwaitST, '\\') => Finished
  | (AwaitST, _) => InProgress
  | (Finished, '\x1B' | '\x9B') => Esc
  | (Finished, _) => Idle
  }
}
