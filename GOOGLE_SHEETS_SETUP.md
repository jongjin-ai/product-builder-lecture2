# Drive CSV Setup

## What this does
The Apps Script endpoint writes each consultation request into a CSV file named `상담신청데이터.csv` inside this Google Drive folder:
- `https://drive.google.com/drive/folders/1hjF47sZEnHsFyv47lth_bXwIlmMVAobe`

## 1. Create the Apps Script project
1. Open any Google Sheet or go to `https://script.google.com/`.
2. Create a new Apps Script project.
3. Replace the default code with the contents of `google-apps-script/Code.gs`.
4. Save the project.

## 2. Deploy the web app
1. Click `Deploy > New deployment`.
2. Choose `Web app`.
3. Execute as: `Me`.
4. Who has access: `Anyone`.
5. Deploy and copy the web app URL.

## 3. Connect the site
1. Open `index.html`.
2. Set `GOOGLE_SCRIPT_WEB_APP_URL` to the deployed web app URL.
3. Commit and push again.

## Stored columns in CSV
- 접수일시
- 담당자
- 성명
- 연락처
- 이메일
- 상담내용
- 개인정보동의
- 문의ID

## Notes
- If `GOOGLE_SCRIPT_WEB_APP_URL` is empty, the site falls back to browser localStorage only.
- The CSV file is appended inside the specified Drive folder, not downloaded to the visitor's machine.
- Redeploy the Apps Script as a new version after script changes.
