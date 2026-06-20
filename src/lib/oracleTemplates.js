// Oracle 23ai 참고 템플릿 (Orange for Oracle 스타일 브라우저)
// 항목 선택 시 에디터 커서 위치에 code 가 삽입된다.
export const ORACLE_TEMPLATES = [
  {
    key: 'dml',
    title: 'DML 정보보기',
    items: [
      {
        name: 'SELECT (기본)',
        code: `SELECT col1, col2\n  FROM table_name\n WHERE condition\n ORDER BY col1;`,
      },
      {
        name: 'INSERT',
        code: `INSERT INTO table_name (col1, col2)\nVALUES (value1, value2);`,
      },
      {
        name: 'INSERT ... SELECT',
        code: `INSERT INTO target_table (col1, col2)\nSELECT col1, col2 FROM source_table WHERE condition;`,
      },
      {
        name: 'UPDATE',
        code: `UPDATE table_name\n   SET col1 = value1,\n       col2 = value2\n WHERE condition;`,
      },
      {
        name: 'DELETE',
        code: `DELETE FROM table_name\n WHERE condition;`,
      },
      {
        name: 'MERGE',
        code: `MERGE INTO target t\nUSING source s\n   ON (t.id = s.id)\n WHEN MATCHED THEN\n   UPDATE SET t.val = s.val\n WHEN NOT MATCHED THEN\n   INSERT (id, val) VALUES (s.id, s.val);`,
      },
      {
        name: 'INSERT (RETURNING)',
        code: `INSERT INTO table_name (col1)\nVALUES (value1)\nRETURNING id INTO :out_id;`,
      },
    ],
  },
  {
    key: 'plsql',
    title: 'PL/SQL 정보보기',
    items: [
      {
        name: 'Anonymous Block',
        code: `DECLARE\n  v_count NUMBER;\nBEGIN\n  SELECT COUNT(*) INTO v_count FROM table_name;\n  DBMS_OUTPUT.PUT_LINE('count = ' || v_count);\nEXCEPTION\n  WHEN OTHERS THEN\n    DBMS_OUTPUT.PUT_LINE(SQLERRM);\nEND;\n/`,
      },
      {
        name: 'Procedure',
        code: `CREATE OR REPLACE PROCEDURE proc_name (\n  p_id   IN  NUMBER,\n  p_name OUT VARCHAR2\n) AS\nBEGIN\n  SELECT name INTO p_name FROM table_name WHERE id = p_id;\nEND proc_name;\n/`,
      },
      {
        name: 'Function',
        code: `CREATE OR REPLACE FUNCTION fn_name (\n  p_id IN NUMBER\n) RETURN VARCHAR2 AS\n  v_name VARCHAR2(100);\nBEGIN\n  SELECT name INTO v_name FROM table_name WHERE id = p_id;\n  RETURN v_name;\nEND fn_name;\n/`,
      },
      {
        name: 'Package (Spec + Body)',
        code: `CREATE OR REPLACE PACKAGE pkg_name AS\n  PROCEDURE do_work(p_id IN NUMBER);\nEND pkg_name;\n/\n\nCREATE OR REPLACE PACKAGE BODY pkg_name AS\n  PROCEDURE do_work(p_id IN NUMBER) IS\n  BEGIN\n    NULL;\n  END do_work;\nEND pkg_name;\n/`,
      },
      {
        name: 'Cursor (Explicit)',
        code: `DECLARE\n  CURSOR c IS SELECT id, name FROM table_name;\n  v_rec c%ROWTYPE;\nBEGIN\n  OPEN c;\n  LOOP\n    FETCH c INTO v_rec;\n    EXIT WHEN c%NOTFOUND;\n    DBMS_OUTPUT.PUT_LINE(v_rec.name);\n  END LOOP;\n  CLOSE c;\nEND;\n/`,
      },
      {
        name: 'Trigger',
        code: `CREATE OR REPLACE TRIGGER trg_name\nBEFORE INSERT OR UPDATE ON table_name\nFOR EACH ROW\nBEGIN\n  :NEW.updated_at := SYSTIMESTAMP;\nEND;\n/`,
      },
    ],
  },
  {
    key: 'control',
    title: 'PL/SQL Control Structure 정보보기',
    items: [
      { name: 'IF / ELSIF / ELSE', code: `IF condition1 THEN\n  NULL;\nELSIF condition2 THEN\n  NULL;\nELSE\n  NULL;\nEND IF;` },
      { name: 'CASE', code: `CASE v_grade\n  WHEN 'A' THEN dbms_output.put_line('우수');\n  WHEN 'B' THEN dbms_output.put_line('보통');\n  ELSE dbms_output.put_line('기타');\nEND CASE;` },
      { name: 'Basic LOOP', code: `LOOP\n  EXIT WHEN condition;\nEND LOOP;` },
      { name: 'WHILE LOOP', code: `WHILE condition LOOP\n  NULL;\nEND LOOP;` },
      { name: 'FOR LOOP', code: `FOR i IN 1 .. 10 LOOP\n  DBMS_OUTPUT.PUT_LINE(i);\nEND LOOP;` },
      { name: 'Cursor FOR LOOP', code: `FOR rec IN (SELECT id, name FROM table_name) LOOP\n  DBMS_OUTPUT.PUT_LINE(rec.name);\nEND LOOP;` },
      { name: 'FORALL (Bulk)', code: `FORALL i IN 1 .. l_ids.COUNT\n  INSERT INTO table_name (id) VALUES (l_ids(i));` },
    ],
  },
  {
    key: 'pseudo',
    title: 'Pseudo Column 정보보기',
    items: [
      { name: 'ROWNUM', code: `SELECT * FROM (\n  SELECT col1 FROM table_name ORDER BY col1\n) WHERE ROWNUM <= 10;` },
      { name: 'ROWID', code: `SELECT ROWID, col1 FROM table_name WHERE condition;` },
      { name: 'LEVEL (계층 쿼리)', code: `SELECT LEVEL, col1\n  FROM table_name\n START WITH parent_id IS NULL\nCONNECT BY PRIOR id = parent_id;` },
      { name: 'SYSDATE / SYSTIMESTAMP', code: `SELECT SYSDATE, SYSTIMESTAMP FROM DUAL;` },
      { name: 'Sequence NEXTVAL / CURRVAL', code: `SELECT seq_name.NEXTVAL FROM DUAL;\nSELECT seq_name.CURRVAL FROM DUAL;` },
      { name: 'IDENTITY 컬럼 (23ai)', code: `CREATE TABLE t (\n  id NUMBER GENERATED ALWAYS AS IDENTITY,\n  name VARCHAR2(100)\n);` },
    ],
  },
  {
    key: 'function',
    title: 'SQL Function 정보보기',
    items: [
      { name: '문자: SUBSTR / INSTR', code: `SELECT SUBSTR(col1, 1, 10) AS part,\n       INSTR(col1, ',') AS pos\n  FROM table_name;` },
      { name: '문자: REPLACE / TRIM', code: `SELECT REPLACE(col1, 'a', 'b'),\n       TRIM(col1)\n  FROM table_name;` },
      { name: '숫자: ROUND / TRUNC / MOD', code: `SELECT ROUND(val, 2), TRUNC(val), MOD(val, 3) FROM table_name;` },
      { name: '날짜: TO_CHAR / TO_DATE', code: `SELECT TO_CHAR(SYSDATE, 'YYYY-MM-DD HH24:MI:SS') AS now,\n       TO_DATE('2026-06-21', 'YYYY-MM-DD') AS d\n  FROM DUAL;` },
      { name: 'NULL: NVL / NVL2 / COALESCE', code: `SELECT NVL(col1, 0),\n       NVL2(col1, 'Y', 'N'),\n       COALESCE(col1, col2, 0)\n  FROM table_name;` },
      { name: '분석: ROW_NUMBER / RANK', code: `SELECT col1,\n       ROW_NUMBER() OVER (PARTITION BY grp ORDER BY col1) AS rn,\n       RANK()       OVER (PARTITION BY grp ORDER BY col1) AS rnk\n  FROM table_name;` },
      { name: '집계: LISTAGG', code: `SELECT grp,\n       LISTAGG(name, ', ') WITHIN GROUP (ORDER BY name) AS names\n  FROM table_name\n GROUP BY grp;` },
    ],
  },
  {
    key: 'hint',
    title: 'SQL Optimizer Hint 정보보기',
    items: [
      { name: 'INDEX', code: `SELECT /*+ INDEX(t idx_name) */ col1\n  FROM table_name t\n WHERE condition;` },
      { name: 'FULL', code: `SELECT /*+ FULL(t) */ col1 FROM table_name t WHERE condition;` },
      { name: 'LEADING / USE_NL', code: `SELECT /*+ LEADING(a b) USE_NL(b) */ a.col1, b.col2\n  FROM a JOIN b ON a.id = b.a_id;` },
      { name: 'USE_HASH', code: `SELECT /*+ USE_HASH(a b) */ a.col1, b.col2\n  FROM a JOIN b ON a.id = b.a_id;` },
      { name: 'PARALLEL', code: `SELECT /*+ PARALLEL(t, 4) */ col1 FROM table_name t;` },
      { name: 'APPEND (직접 경로 INSERT)', code: `INSERT /*+ APPEND */ INTO target_table\nSELECT * FROM source_table;` },
      { name: 'GATHER_PLAN_STATISTICS', code: `SELECT /*+ GATHER_PLAN_STATISTICS */ col1 FROM table_name WHERE condition;` },
    ],
  },
]
