(function() {
  "use strict";

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector('.header-toggle');

  function headerToggle() {
    document.querySelector('#header').classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }
  headerToggleBtn.addEventListener('click', headerToggle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.header-show')) {
        headerToggle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  /**
    * Scroll table to the right when the page loads
    */
  document.addEventListener("DOMContentLoaded", function () {
    const tableContainer = document.getElementById("tableContainer");
    tableContainer.scrollLeft = tableContainer.scrollWidth;
  });


  /**
 * PDF Export
 */
  document.getElementById("exportPDF").addEventListener("click", function () {
    const { jsPDF } = window.jspdf;
    var doc = new jsPDF();
    var table = document.getElementById("dataTable");

    // تحويل الجدول إلى PDF باستخدام autoTable
    doc.autoTable({ html: table });

    // حفظ الملف بصيغة PDF
    doc.save("table.pdf");
  });

  /**
   * Excel Export
   */
  document.getElementById("exportExcel").addEventListener("click", function () {
    var wb = XLSX.utils.table_to_book(document.getElementById('dataTable'), { sheet: "Sheet 1" });
    XLSX.writeFile(wb, "table.xlsx");
  });

  /**
   * Print Table
   */
  document.getElementById("printTable").addEventListener("click", function () {
    var printContents = document.getElementById("dataTable").outerHTML;
    var newWindow = window.open();
    newWindow.document.write('<html><head><title>Print Table</title></head><body>');
    newWindow.document.write(printContents);
    newWindow.document.write('</body></html>');
    newWindow.document.close();
    newWindow.print();
  });





 













})();




  



