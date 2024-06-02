function step1Chosen(id) {
    saveData("step1Item", id);
    window.location.href = '/step-2/';
}

// step-2
$(document).ready(function () {
    //  模擬不可預約時間
    $('#rentDate').change(function () {
        const timeSlots = $('#timeSlotList .list-group-item');
        timeSlots.removeAttr('disabled'); // 先移除所有disabled屬性
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

    $('#rentReason').change(function () {
        const rentReason = $(this).val();
        saveData('step2Reason', rentReason);
    });

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


function saveData(key, value) {
    if (value == "" || value == null) {
        // localStorage.removeItem(key);
    } else {
        localStorage.setItem(key, value);
    }
}


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