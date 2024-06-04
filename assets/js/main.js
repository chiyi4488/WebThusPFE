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

    // 變更教師／學生證號
    $('#idNumber').change(function () {
        const idNumber = $(this).val();
        saveData('step2IDNumber', idNumber);
    });

    // 變更聯絡電話
    $('#phone').change(function () {
        const phone = $(this).val();
        saveData('step2phone', phone);
    });

    // 變更租借事由
    $('#rentReason').change(function () {
        const rentReason = $(this).val();
        saveData('step2Reason', rentReason);
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
    const idNumber = localStorage.getItem('step2IDNumber');

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
    if (idNumber) {
        $('#idNumberCell').text(idNumber);
    }

    $('#confirmButton').click(function () {
        const selectedRentDate = $('#rentDateCell').text();
        const selectedTimeSlots = $('#timeSlotsCell').text().split(', ');
        const rentReason = $('#rentReasonCell').text();
        saveRentInfo(selectedRentDate, selectedTimeSlots, rentReason, idNumber, contactPhone);
    });

    const rentInfoKey = 'rentInfoList';
    function saveRentInfo(date, timeSlots, reason, idNumber, phone) {
        const rentInfoList = JSON.parse(localStorage.getItem(rentInfoKey)) || [];
        const newRentInfo = {
            date: date,
            timeSlots: timeSlots,
            item: '高階13色流式細胞儀', // 預設項目名稱
            status: '尚未繳費', // 預設狀態
            id: idNumber,
            phone: phone,
            reason: reason
        };
        rentInfoList.push(newRentInfo);
        saveData(rentInfoKey, JSON.stringify(rentInfoList));
        clearData(['step1Item', 'step2phone', 'step2Date', 'step2Reason', 'step2Time', 'step2IDNumber']);
        window.location.href = '/payment/?time=' + encodeURIComponent(date);
    }
});



// payment
$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    const timeParam = urlParams.get('time');
    const tableBody = $('#paymentTableBody');

    if (timeParam) {
        const rentInfoKey = 'rentInfoList';
        const rentInfoList = JSON.parse(localStorage.getItem(rentInfoKey)) || [];
        const orderIndex = rentInfoList.findIndex(info => info.date === timeParam);
        console.log(orderIndex)
        if (orderIndex !== -1) {
            const order = rentInfoList[orderIndex];
            if (order.status === '尚未繳費') {
                let totalPrice = 0;
                order.timeSlots.forEach(timeSlot => {
                    const row = `
                        <tr>
                            <td>${timeSlot}</td>
                            <td style="text-align: right;">$300</td>
                        </tr>
                    `;
                    tableBody.append(row);
                    totalPrice += 300;
                });

                const totalRow = `
                    <tr>
                        <td colspan="2" style="text-align: right;">共計 ${totalPrice} 圓整</td>
                    </tr>
                `;
                tableBody.append(totalRow);

                $('#paymentButton').click(function () {
                    // 更新訂單狀態為預約成功
                    rentInfoList[orderIndex].status = '預約成功';
                    localStorage.setItem(rentInfoKey, JSON.stringify(rentInfoList));
                    window.location.href = '/order/';
                });
            } else {
                const row = `
                    <tr>
                        <td colspan="2" style="text-align: center; font-weight: bold;">訂單已經繳費</td>
                    </tr>
                `;
                tableBody.append(row);
                $('#paymentButton').hide();
            }
        } else {
            const row = `
                <tr>
                    <td colspan="2" style="text-align: center; font-weight: bold;">找不到相應的訂單</td>
                </tr>
            `;
            tableBody.append(row);
            $('#paymentButton').hide();
        }
    } else {
        const row = `
            <tr>
                <td colspan="2" style="text-align: center; font-weight: bold;">缺少時間參數</td>
            </tr>
        `;
        tableBody.append(row);
        $('#paymentButton').hide();
    }
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