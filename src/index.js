import jspreadsheet from "jspreadsheet";
// import shapes from "@jspreadsheet/shapes";
import shapes from './js/shapes.js';
import 'jspreadsheet/dist/jspreadsheet.css';
import 'jsuites/dist/jsuites.css';
import '@lemonadejs/studio/dist/style.css';
import './css/shapes.css'

jspreadsheet.setLicense('N2UxZDYxZWQ5MDA5YTQ1ODQ4NTcwYWJjNDg4MjE5MzliM2E2NWE5NTQ0YTk1OWEzNDJkZjMwNTZkZjNmNGY1NWM3NjU5ZGMzN2E5MTljOTRiMjE3ZjRmMGVmZmIyZTlmMWNjYTQzZjFjZTIzODI0MmI1YjgwMTE0MzEwZjhlMGIsZXlKamJHbGxiblJKWkNJNklqTTFObUV4T1RKaU56a3hNMkl3TkdNMU5EVTNOR1F4T0dNeU9HUTBObVUyTXprMU5ESTRZV0lpTENKdVlXMWxJam9pU25Od2NtVmhaSE5vWldWMElpd2laR0YwWlNJNk1UYzBNemN5TVRJd01Dd2laRzl0WVdsdUlqcGJJbXB6YUdWc2JDNXVaWFFpTENKamMySXVZWEJ3SWl3aWFuTndjbVZoWkhOb1pXVjBMbU52YlNJc0luVmxMbU52YlM1aWNpSXNJbU5rY0c0dWFXOGlMQ0pwYm5SeVlYTm9aV1YwY3k1amIyMGlMQ0p6Wm1OdlpHVmliM1F1WTI5dElpd2lkMlZpSWl3aWJHOWpZV3hvYjNOMElsMHNJbkJzWVc0aU9pSXpOQ0lzSW5OamIzQmxJanBiSW5ZM0lpd2lkamdpTENKMk9TSXNJbll4TUNJc0luWXhNU0lzSW1admNtMXpJaXdpWm05eWJYVnNZU0lzSW5KbGJtUmxjaUlzSW5CaGNuTmxjaUlzSW1sdGNHOXlkR1Z5SWl3aWRtRnNhV1JoZEdsdmJuTWlMQ0pqYjIxdFpXNTBjeUlzSW5ObFlYSmphQ0lzSW1Ob1lYSjBjeUlzSW5CeWFXNTBJaXdpWW1GeUlpd2ljMmhsWlhSeklpd2ljMmhoY0dWeklpd2ljMlZ5ZG1WeUlpd2labTl5YldGMElpd2lhVzUwY21GemFHVmxkSE1pWFgwPQ==');
jspreadsheet.setExtensions({ shapes });
let worksheets = jspreadsheet(document.getElementById('spreadsheet'), {
    tabs: true,
    toolbar: true,
    fullscreen: false,
    worksheets: [{
        minDimensions: [50, 50],
        tableOverflow: true,
        tableWidth: 1000,
        tableHeight: 500,
    }],
});