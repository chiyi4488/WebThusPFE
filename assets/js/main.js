// 儲存資料到 localStorage
function saveData(key, value) {
    if (value) {
        localStorage.setItem(key, value);
    } 
}

// 清除資料從 localStorage
function clearData(keys) {
    keys.forEach(key => localStorage.removeItem(key));
}

// step-1
function step1Chosen(id) {
    saveData("step1Item", id);
    window.location.href = '/step-2/';
}

// step-2
$(document).ready(function () {
    // 模擬不可預約時間
    $('#rentDate').change(function () {
        const timeSlots = $('#timeSlotList .list-group-item');
        timeSlots.removeAttr('disabled');
        const randomSlots = [];
        while (randomSlots.length < 3) {
            const randomIndex = Math.floor(Math.random() * timeSlots.length);
            if (!randomSlots.includes(randomIndex)) {
                randomSlots.push(randomIndex);
            }
        }
        randomSlots.forEach(index => {
            timeSlots.eq(index).attr('disabled', 'disabled');
        });
        const selectedDate = $('#rentDate').val();
        saveData('step2Date', selectedDate);
    });

    // 變更租借事由
    $('#rentReason').change(function () {
        const rentReason = $(this).val();
        saveData('step2Reason', rentReason);
    });

    // 變更聯絡電話
    $('#phone').change(function () {
        const phone = $(this).val();
        saveData('step2phone', phone);
    });

    // 儲存預約時段
    const timeSlots = document.querySelectorAll('#timeSlotList .list-group-item');
    timeSlots.forEach(slot => {
        slot.addEventListener('click', function (event) {
            event.preventDefault();
            this.classList.toggle('active');
            saveSelectedTimeSlots();
        });
    });

    function saveSelectedTimeSlots() {
        const selectedSlots = [];
        $('#timeSlotList .list-group-item.active').each(function () {
            selectedSlots.push($(this).text().trim());
        });
        saveData('step2Time', JSON.stringify(selectedSlots));
    }
});

// step-3
$(document).ready(function () {
    const contactPhone = localStorage.getItem('step2phone');
    const selectedRentDate = localStorage.getItem('step2Date');
    const rentReason = localStorage.getItem('step2Reason');
    const rentItem = localStorage.getItem('step1Item');
    const selectedTimeSlots = JSON.parse(localStorage.getItem('step2Time')) || [];

    // 顯示資料
    if (contactPhone) {
        $('#contactPhoneCell').text(contactPhone);
    }
    if (selectedRentDate) {
        $('#rentDateCell').text(selectedRentDate);
    }
    if (rentReason) {
        $('#rentReasonCell').text(rentReason);
    }
    if (rentItem) {
        $('#rentItemCell').text(rentItem);
    }
    if (selectedTimeSlots.length > 0) {
        $('#timeSlotsCell').text(selectedTimeSlots.join(', '));
    }

    $('#confirmButton').click(function () {
        const selectedRentDate = $('#rentDateCell').text();
        const selectedTimeSlots = $('#timeSlotsCell').text().split(', ');
        const rentReason = $('#rentReasonCell').text();
        saveRentInfo(selectedRentDate, selectedTimeSlots, rentReason);
    });

    const rentInfoKey = 'rentInfoList';

    function saveRentInfo(date, timeSlots, reason) {
        const rentInfoList = JSON.parse(localStorage.getItem(rentInfoKey)) || [];
        const newRentInfo = {
            date: date,
            timeSlots: timeSlots,
            item: '高階13色流式細胞儀', // 預設項目名稱
            status: '尚未繳費', // 預設狀態
        };
        rentInfoList.push(newRentInfo);
        saveData(rentInfoKey, JSON.stringify(rentInfoList));
        clearData(['step1Item', 'step2phone', 'step2Date', 'step2Reason', 'step2Time']);
        window.location.href = '/payment/';
    }
});

// order
$(document).ready(function () {
    const rentInfoKey = 'rentInfoList';

    function loadRentInfo() {
        const rentInfoList = JSON.parse(localStorage.getItem(rentInfoKey)) || [];
        const tbody = $('#rentInfoTableBody');
        tbody.empty();
        rentInfoList.forEach(info => {
            const statusBadge = getStatusBadge(info.status);
            const row = `
                <tr>
                    <td>${info.date}</td>
                    <td>${info.timeSlots.join(', ')}</td>
                    <td>${info.item}</td>
                    <td>${statusBadge}</td>
                    <td><button class="btn btn-danger btn-sm" data-mdb-ripple-init data-mdb-modal-init data-mdb-target="#exampleModal">取消預約</button></td>
                </tr>
            `;
            tbody.append(row);
        });
    }

    function getStatusBadge(status) {
        let badgeClass = '';
        let badgeText = '';
        switch (status) {
            case '尚未繳費':
                badgeClass = 'badge-warning';
                badgeText = `<a class="link-warning" href="/payment">尚未繳費</a>`;
                break;
            case '預約成功':
                badgeClass = 'badge-primary';
                badgeText = '預約成功';
                break;
            case '繳費逾期':
                badgeClass = 'badge-danger';
                badgeText = '繳費逾期';
                break;
            case '已經取消':
                badgeClass = 'badge-secondary';
                badgeText = '已經取消';
                break;
        }
        return `<span class="badge ${badgeClass}" style="font-size: 14px;">${badgeText}</span>`;
    }

    loadRentInfo();
});



// document.addEventListener('DOMContentLoaded', function () {
//     var calendarEl = document.getElementById('calendar');

//     // 預約事件資料（這應該從伺服器端取得）
//     var events = [
//         {
//             title: '已預約',
//             start: '2024-05-25',
//             end: '2024-05-25',
//             backgroundColor: 'red', // 用紅色標示已預約
//             rendering: 'background' // 使其不可選取
//         },
//         // 添加更多已預約事件
//     ];

//     var calendar = new FullCalendar.Calendar(calendarEl, {
//         initialView: 'dayGridMonth',
//         selectable: true,
//         events: events,
//         schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
//         select: function (info) {
//             var selectedDate = info.startStr;
//             var existingEvent = events.find(event => event.start === selectedDate);
//             if (existingEvent) {
//                 alert('該日期已被預約，請選擇其他日期。');
//                 calendar.unselect();
//             } else {
//                 // 使用者選取日期處理
//                 var formDateInput = document.getElementById('selectedDate');
//                 if (!formDateInput) {
//                     formDateInput = document.createElement('input');
//                     formDateInput.type = 'hidden';
//                     formDateInput.id = 'selectedDate';
//                     formDateInput.value = selectedDate;
//                     document.body.appendChild(formDateInput);
//                 } else {
//                     formDateInput.value = selectedDate;
//                 }
//                 alert('您選取的日期是：' + selectedDate);
//             }
//         },
//         locale: 'zh-TW'
//     });

//     calendar.render();

//     document.getElementById('submitBtn').addEventListener('click', function () {
//         var selectedDateInput = document.getElementById('selectedDate');
//         if (selectedDateInput) {
//             var selectedDate = selectedDateInput.value;
//             var name = document.getElementById('name').value;
//             var idNumber = document.getElementById('idNumber').value;
//             var phone = document.getElementById('phone').value;
//             var reason = document.getElementById('reason').value;

//             // 提交資料
//             console.log({
//                 name: name,
//                 idNumber: idNumber,
//                 phone: phone,
//                 selectedDate: selectedDate,
//                 reason: reason
//             });

//             // 可以在這裡發送 AJAX 請求到伺服器以保存預約資料

//             alert('您的預約已提交！');
//         } else {
//             alert('請先選取一個日期！');
//         }
//     });
// });