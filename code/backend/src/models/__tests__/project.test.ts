import { createProject } from "../../test/setup";

test("can create a new project", async () => {
  const project_1 = await createProject("project_1", "junk");
  expect(project_1).not.toBeNull();
  expect(project_1?.name).toEqual("project_1");
  expect(project_1?.urlLogo).toEqual("junk");
});