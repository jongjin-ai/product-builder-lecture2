const DRIVE_FOLDER_ID = '1hjF47sZEnHsFyv47lth_bXwIlmMVAobe';
const CSV_FILE_NAME = '상담신청데이터.csv';
const CSV_HEADERS = [
  '접수일시',
  '담당자',
  '성명',
  '연락처',
  '이메일',
  '상담내용',
  '개인정보동의',
  '문의ID',
];

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents || '{}');

    if (!data.name || !data.phone || !data.email || !data.message || !data.consent) {
      return jsonOutput_({
        result: 'error',
        message: '필수 항목이 누락되었습니다.',
      });
    }

    const folder = DriveApp.getFolderById(DRIVE_FOLDER_ID);
    const file = getOrCreateCsvFile_(folder);
    const row = [
      data.submittedAt || new Date().toISOString(),
      data.consultant || '',
      data.name || '',
      data.phone || '',
      data.email || '',
      data.message || '',
      data.consent ? '동의' : '미동의',
      data.id || '',
    ];

    appendCsvRow_(file, row);

    return jsonOutput_({
      result: 'success',
      message: '상담신청이 Drive 폴더의 CSV 파일에 저장되었습니다.',
    });
  } catch (error) {
    return jsonOutput_({
      result: 'error',
      message: error.message,
    });
  }
}

function doGet() {
  return jsonOutput_({
    result: 'success',
    message: 'Apps Script endpoint is running.',
  });
}

function getOrCreateCsvFile_(folder) {
  const files = folder.getFilesByName(CSV_FILE_NAME);
  if (files.hasNext()) {
    return files.next();
  }

  const initialContent = '\uFEFF' + toCsvLine_(CSV_HEADERS) + '\n';
  return folder.createFile(CSV_FILE_NAME, initialContent, MimeType.CSV);
}

function appendCsvRow_(file, row) {
  const currentContent = file.getBlob().getDataAsString('UTF-8');
  const nextContent = currentContent + toCsvLine_(row) + '\n';
  file.setContent(nextContent);
}

function toCsvLine_(values) {
  return values
    .map(function (value) {
      const normalized = String(value == null ? '' : value).replace(/"/g, '""').replace(/\r?\n/g, ' ');
      return '"' + normalized + '"';
    })
    .join(',');
}

function jsonOutput_(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
