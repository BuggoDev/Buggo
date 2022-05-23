import { Account, Project } from "./commonTypes";

/**
 * Insecure way to get cookie, ideally, we use one domain for front and backend
 * to let backend set http only cookies, so we do not need to worry about cookies
 * in frontend
 * @param name cookie name
 * @returns
 */
export function getCookie(name: string): string | null {
  const nameLenPlus = name.length + 1;
  return (
    document.cookie
      .split(";")
      .map((c) => c.trim())
      .filter((cookie) => {
        return cookie.substring(0, nameLenPlus) === `${name}=`;
      })
      .map((cookie) => {
        return decodeURIComponent(cookie.substring(nameLenPlus));
      })[0] || null
  );
}

export function deleteCookie(name: string) {
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}

/**
 *
 * @param event ClipBoardEvent from event handler
 * @returns a ready made form data containing the clipboard image under the name "file" that can be processed by multer
 */
export const clipBoardToFormData = (event: ClipboardEvent) => {
  if (!event.clipboardData) return;
  const items = event!.clipboardData.items;
  const item = items[0];
  if (item.kind === "file") {
    const blob = item.getAsFile();
    const formData = new FormData();
    formData.append("file", blob!);
    return formData;
  }
  return null;
};

export const dropImageToFormData = (event: any) => {
  const files = event.dataTransfer.files;
  if (files.length > 0) {
    const formData = new FormData();
    formData.append("file", files[0]);
    return formData;
  }
  return null;
};

export const isUserProjectDeveloper = (
  user: Account,
  project: Project | null
) => {
  if (!project) return false;
  return project.developers.some((developer) => developer.email === user.email);
};
