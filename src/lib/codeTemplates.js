// 언어별 코드 템플릿 (보기 + 에디터 삽입 + 복사)
// 각 언어는 src/lib/templates/<lang>.js 모듈로 분리 관리
import python from './templates/python'
import java from './templates/java'
import javascript from './templates/javascript'
import typescript from './templates/typescript'
import csharp from './templates/csharp'
import go from './templates/go'

export const CODE_TEMPLATES = [python, java, javascript, typescript, csharp, go]
