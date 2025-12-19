/**
 * Export data to CSV file
 * @param {Array} data - Array of objects to export
 * @param {Array} columns - Array of column definitions: [{ key: 'field', label: 'Display Name' }, ...]
 * @param {string} filename - Name of the file (without extension)
 */
export const exportToCSV = (data, columns, filename = 'export') => {
  if (!data || data.length === 0) {
    alert('No data to export');
    return;
  }

  // Create CSV header
  const headers = columns.map(col => col.label || col.key);
  const csvRows = [headers.join(',')];

  // Create CSV rows
  data.forEach(item => {
    const values = columns.map(col => {
      let value = item[col.key];
      
      // Handle nested objects/arrays
      if (value === null || value === undefined) {
        value = '';
      } else if (typeof value === 'object') {
        if (Array.isArray(value)) {
          value = value.length > 0 ? value.join('; ') : '';
        } else {
          value = JSON.stringify(value);
        }
      } else if (typeof value === 'boolean') {
        value = value ? 'Yes' : 'No';
      } else if (typeof value === 'string') {
        // Escape quotes and wrap in quotes if contains comma, newline, or quote
        if (value.includes(',') || value.includes('\n') || value.includes('"')) {
          value = `"${value.replace(/"/g, '""')}"`;
        }
      }
      
      return String(value);
    });
    csvRows.push(values.join(','));
  });

  // Create CSV content
  const csvContent = csvRows.join('\n');

  // Create blob and download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  URL.revokeObjectURL(url);
};

/**
 * Export data to Excel (XLSX) format using SheetJS
 * Requires: npm install xlsx
 * @param {Array} data - Array of objects to export
 * @param {Array} columns - Array of column definitions: [{ key: 'field', label: 'Display Name' }, ...]
 * @param {string} filename - Name of the file (without extension)
 */
export const exportToExcel = async (data, columns, filename = 'export') => {
  try {
    // Dynamically import xlsx library
    const XLSX = await import('xlsx');
    
    if (!data || data.length === 0) {
      alert('No data to export');
      return;
    }

    // Prepare data for Excel
    const excelData = data.map(item => {
      const row = {};
      columns.forEach(col => {
        let value = item[col.key];
        
        // Handle nested objects/arrays
        if (value === null || value === undefined) {
          value = '';
        } else if (typeof value === 'object') {
          if (Array.isArray(value)) {
            value = value.length > 0 ? value.join('; ') : '';
          } else {
            value = JSON.stringify(value);
          }
        } else if (typeof value === 'boolean') {
          value = value ? 'Yes' : 'No';
        }
        
        row[col.label || col.key] = value;
      });
      return row;
    });

    // Create workbook and worksheet
    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // Set column widths
    const colWidths = columns.map(() => ({ wch: 20 }));
    worksheet['!cols'] = colWidths;

    // Generate Excel file and download
    XLSX.writeFile(workbook, `${filename}_${new Date().toISOString().split('T')[0]}.xlsx`);
  } catch (error) {
    console.error('Error exporting to Excel:', error);
    // Fallback to CSV if xlsx is not available
    alert('Excel export requires xlsx library. Falling back to CSV export.');
    exportToCSV(data, columns, filename);
  }
};

