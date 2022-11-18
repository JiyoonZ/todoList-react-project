//@type/styled-components 에 있는 index.d.ts 를 확장시켜서 사용
import "styled-components";

//나의 테마정의를 확장시키기기!
declare module "styled-components" {
  export interface DefaultTheme {
    bgColor: string;
    boardColor: string;
    cardColor: string;
  }
}
