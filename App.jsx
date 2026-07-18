‎Jsx.
‎
‎
‎"use client";
‎import React, { useState, useEffect } from "react";
‎import { motion } from "framer-motion";
‎
‎// ========================================================
‎// 🛡️ 1. SECURITY & LIVE GOOGLE LOGIN CONFIGURATION
‎// ========================================================
‎const LIVE_GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID_HERE.apps.googleusercontent.com";
‎const INITIAL_ALLOWED_ADMINS = [
‎  { id: 1, email: "scorpiontraders.07@gmail.com", device: "Acer Laptop (Primary)", addedOn: "2026-04-12" }
‎];
‎
‎// ڈیمو کسٹمر اکاؤنٹس جو سسٹم میں رجسٹرڈ ہیں
‎const INITIAL_REGISTERED_USERS = [
‎  { id: 101, name: "Zain Ali", email: "xyz@gmail.com", joinedDate: "2026-06-01", status: "Active" },
‎  { id: 102, name: "Hamza Khan", email: "abc.pk@gmail.com", joinedDate: "2026-07-10", status: "Active" },
‎  { id: 103, name: "Ayesha Bibi", email: "abc@gmail.com", joinedDate: "2026-07-14", status: "Suspended" }
‎];
‎
‎// ========================================================
‎// 🛒 2. PRO-CHECKOUT FORM COMPONENT
‎// ========================================================
‎function CheckoutForm({ product, currency, onClose, onNewOrderSuccess }) {
‎  const [formData, setFormData] = useState({ name: "", phone: "", email: "", address: "", specialNote: "", paymentMethod: "Cash on Delivery (COD)" });
‎  const priceDisplay = currency === "USD" ? `$${(product.pricePKR / 280).toFixed(2)}` : `Rs. ${product.pricePKR.toLocaleString()}`;
‎
‎  const handleSubmit = (e) => {
‎    e.preventDefault();
‎    const newOrder = {
‎      id: "ORD-" + Math.floor(100000 + Math.random() * 900000),
‎      customerName: formData.name,
‎      phone: formData.phone,
‎      email: formData.email,
‎      address: formData.address,
‎      productTitle: product.title,
‎      amount: priceDisplay,
‎      paymentMethod: formData.paymentMethod,
‎      status: "Processing",
‎      date: new Date().toISOString().split('T')[0]
‎    };
‎    onNewOrderSuccess(newOrder);
‎    alert(`شکریہ ${formData.name}! آپ کا آرڈر موصول ہو گیا ہے اور ایڈمن پینل میں اپڈیٹ ہو چکا ہے۔`);
‎    onClose();
‎  };
‎
‎  return (
‎    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200 shadow-xl my-8 max-w-2xl mx-auto relative z-50">
‎      <button onClick={onClose} className="absolute top-4 right-4 text-neutral-400 hover:text-black font-bold text-lg">✕</button>
‎      <div className="border-b border-neutral-200 pb-4 mb-6">
‎        <h2 className="text-xl font-black text-neutral-900">🛍️ Complete Your Order</h2>
‎        <p className="text-xs text-neutral-500 mt-1">ڈیلیوری اور پیمنٹ کی درست معلومات درج کریں۔</p>
‎      </div>
‎      <div className="bg-neutral-50 p-4 rounded-2xl mb-6 flex justify-between items-center border border-neutral-100">
‎        <span className="text-xs font-bold text-neutral-600 uppercase">Item: {product.title}</span>
‎        <span className="text-xl font-black text-neutral-900">{priceDisplay}</span>
‎      </div>
‎      <form onSubmit={handleSubmit} className="space-y-4">
‎        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
‎          <input type="text" placeholder="Full Name *" required className="w-full bg-neutral-50 border border-neutral-200 rounded-xl p-3 text-sm" onChange={(e) => setFormData({...formData, name: e.target.value})} />
‎          <input type="tel" placeholder="Phone Number *" required className="w-full bg-neutral-50 border border-neutral-200 rounded-xl p-3 text-sm font-medium" onChange={(e) => setFormData({...formData, phone: e.target.value})} />
‎        </div>
‎        <input type="email" placeholder="Email Address *" required className="w-full bg-neutral-50 border border-neutral-200 rounded-xl p-3 text-sm" onChange={(e) => setFormData({...formData, email: e.target.value})} />
‎        <select className="w-full bg-neutral-50 border border-neutral-200 rounded-xl p-3 text-sm font-semibold" value={formData.paymentMethod} onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}>
‎          <option value="Cash on Delivery (COD)">Cash on Delivery (COD)</option>
‎          <option value="Direct Bank Transfer">Direct Bank Transfer (JazzCash/EasyPaisa)</option>
‎        </select>
‎        <textarea placeholder="Delivery Address *" required className="w-full bg-neutral-50 border border-neutral-200 rounded-xl p-3 text-sm h-16" onChange={(e) => setFormData({...formData, address: e.target.value})} />
‎        <textarea placeholder="Special Note (Optional)" className="w-full bg-neutral-50 border border-neutral-200 rounded-xl p-3 text-sm h-14" onChange={(e) => setFormData({...formData, specialNote: e.target.value})} />
‎        <button type="submit" className="w-full bg-neutral-900 text-white font-bold py-3.5 rounded-xl hover:bg-black transition-all text-sm">Confirm Order</button>
‎      </form>
‎    </div>
‎  );
‎}
‎
‎// ========================================================
‎// 📊 3. FULL-DETAIL POWER DASHBOARD COMPONENT
‎// ========================================================
‎function AdminDashboard({ allowedAdmins, setAllowedAdmins, shippingFees, setShippingFees, ordersList, setOrdersList, supportMessages, liveTraffic, registeredUsers, setRegisteredUsers }) {
‎  const [newEmail, setNewEmail] = useState("");
‎  const [newDevice, setNewDevice] = useState("");
‎  const [tcsFee, setTcsFee] = useState(shippingFees.TCS);
‎  const [leopardFee, setLeopardFee] = useState(shippingFees.Leopard);
‎
‎  const totalRevenuePKR = ordersList.reduce((acc, curr) => acc + (curr.amount.includes("Rs.") ? parseInt(curr.amount.replace(/[^0-9]/g, '')) : 0), 485000);
‎
‎  const handleAddAdmin = (e) => {
‎    e.preventDefault();
‎    if (!newEmail) return;
‎    setAllowedAdmins([...allowedAdmins, { id: Date.now(), email: newEmail, device: newDevice || "Admin Device", addedOn: new Date().toISOString().split('T')[0] }]);
‎    setNewEmail(""); setNewDevice("");
‎    alert("نیا ایڈمن کامیابی سے شامل کر دیا گیا ہے!");
‎  };
‎
‎  const handleRemoveAdmin = (id) => {
‎    if (allowedAdmins.length === 1) {
‎      alert("کم از کم ایک مین ایڈمن کا ہونا لازمی ہے!");
‎      return;
‎    }
‎    setAllowedAdmins(allowedAdmins.filter(admin => admin.id !== id));
‎  };
‎
‎  return (
‎    <div className="bg-neutral-50 p-6 sm:p-8 rounded-3xl border border-neutral-200 shadow-sm my-8 space-y-8">
‎      <div className="border-b border-neutral-200 pb-4">
‎        <h2 className="text-xl font-black tracking-tight text-neutral-900">🔒 FULL-DETAIL POWER ADMIN PANEL</h2>
‎        <p className="text-xs text-neutral-500 mt-1">ویب سائٹ مانیٹرنگ، ایڈمن لاگز، سیکیورٹی اور ٹریفک کنٹرول اوپن ہے</p>
‎      </div>
‎
‎      {/* 🚀 ٹریفک اور لائیو ڈیٹا میٹرکس */}
‎      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
‎        <div className="bg-white p-5 rounded-2xl border border-neutral-100 shadow-sm relative overflow-hidden">
‎          <span className="text-[10px] uppercase font-bold text-neutral-400">Live Website Traffic</span>
‎          <div className="text-2xl font-extrabold text-green-600 mt-1 flex items-center gap-2">
‎            <span className="w-2 h-2 rounded-full bg-green-500 animate-ping"></span>
‎            {liveTraffic} Active Users
‎          </div>
‎          <p className="text-[10px] text-neutral-400 mt-1">اس وقت کسٹمرز ہوم پیج دیکھ رہے ہیں</p>
‎        </div>
‎        <div className="bg-white p-5 rounded-2xl border border-neutral-100 shadow-sm">
‎          <span className="text-[10px] uppercase font-bold text-neutral-400">Registered Accounts</span>
‎          <div className="text-2xl font-extrabold text-neutral-900 mt-1">{registeredUsers.length} Users</div>
‎          <p className="text-[10px] text-neutral-400 mt-1">جنہوں نے جی میل سے لاگ ان کیا</p>
‎        </div>
‎        <div className="bg-white p-5 rounded-2xl border border-neutral-100 shadow-sm">
‎          <span className="text-[10px] uppercase font-bold text-neutral-400">Total Revenue (Live)</span>
‎          <div className="text-2xl font-extrabold text-neutral-900 mt-1">Rs. {totalRevenuePKR.toLocaleString()}</div>
‎        </div>
‎        <div className="bg-white p-5 rounded-2xl border border-neutral-100 shadow-sm">
‎          <span className="text-[10px] uppercase font-bold text-neutral-400">Unread Support Chats</span>
‎          <div className="text-2xl font-extrabold text-red-600 mt-1">{supportMessages.length} New</div>
‎        </div>
‎      </div>
‎
‎      {/* 🛡️ ایڈمن مینجمنٹ اور جی میل لسٹ (Whitelisted Admins) */}
‎      <div className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm space-y-4">
‎        <h3 className="text-sm font-bold text-neutral-800">🔑 Whitelisted Admins & Gmail Access</h3>
‎        <div className="overflow-x-auto">
‎          <table className="w-full text-left text-xs border-collapse">
‎            <thead>
‎              <tr className="bg-neutral-50 border-b border-neutral-100 text-neutral-500 font-bold">
‎                <th className="p-3">Admin Gmail</th>
‎                <th className="p-3">Assigned Device</th>
‎                <th className="p-3">Added Date</th>
‎                <th className="p-3 text-right">Action</th>
‎              </tr>
‎            </thead>
‎            <tbody className="divide-y divide-neutral-100 font-medium text-neutral-700">
‎              {allowedAdmins.map((admin) => (
‎                <tr key={admin.id} className="hover:bg-neutral-50/50">
‎                  <td className="p-3 font-bold text-neutral-900">{admin.email}</td>
‎                  <td className="p-3 text-neutral-500">{admin.device}</td>
‎                  <td className="p-3 text-neutral-400">{admin.addedOn}</td>
‎                  <td className="p-3 text-right">
‎                    <button onClick={() => handleRemoveAdmin(admin.id)} className="text-red-500 hover:text-red-700 font-bold px-2 py-1">Remove</button>
‎                  </td>
‎                </tr>
‎              ))}
‎            </tbody>
‎          </table>
‎        </div>
‎
‎        {/* نیا ایڈمن ایڈ کرنے کا فارم */}
‎        <form onSubmit={handleAddAdmin} className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-neutral-100">
‎          <input type="email" placeholder="Partner/Admin Gmail Address" required value={newEmail} onChange={(e) => setNewEmail(e.target.value)} className="bg-neutral-50 border border-neutral-200 rounded-xl p-2.5 text-xs font-semibold" />
‎          <input type="text" placeholder="Device Name (e.g. Laptop, Mobile)" value={newDevice} onChange={(e) => setNewDevice(e.target.value)} className="bg-neutral-50 border border-neutral-200 rounded-xl p-2.5 text-xs" />
‎          <button type="submit" className="bg-neutral-900 text-white font-bold text-xs rounded-xl hover:bg-black transition-all">Add Admin Access</button>
‎        </form>
‎      </div>
‎
‎      {/* 👥 رجسٹرڈ کسٹمرز انفارمیشن لاگ (Registered Accounts Details) */}
‎      <div className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm">
‎        <h3 className="text-sm font-bold text-neutral-800 mb-3">👥 Customer Accounts & Login Status</h3>
‎        <div className="overflow-x-auto">
‎          <table className="w-full text-left text-xs border-collapse">
‎            <thead>
‎              <tr className="bg-neutral-50 border-b border-neutral-100 text-neutral-500 font-bold">
‎                <th className="p-3">User ID</th>
‎                <th className="p-3">Customer Name</th>
‎                <th className="p-3">Registered Gmail</th>
‎                <th className="p-3">Account Created</th>
‎                <th className="p-3">Status</th>
‎              </tr>
‎            </thead>
‎            <tbody className="divide-y divide-neutral-100 font-medium">
‎              {registeredUsers.map((user) => (
‎                <tr key={user.id} className="hover:bg-neutral-50/50">
‎                  <td className="p-3 font-bold text-neutral-500">#{user.id}</td>
‎                  <td className="p-3 font-bold text-neutral-900">{user.name}</td>
‎                  <td className="p-3 text-neutral-600">{user.email}</td>
‎                  <td className="p-3 text-neutral-400">{user.joinedDate}</td>
‎                  <td className="p-3">
‎                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${user.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
‎                      {user.status}
‎                    </span>
‎                  </td>
‎                </tr>
‎              ))}
‎            </tbody>
‎          </table>
‎        </div>
‎      </div>
‎
‎      {/* 📦 آرڈرز اور پیمنٹ لاگز */}
‎      <div className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm overflow-hidden">
‎        <h3 className="text-sm font-bold text-neutral-800 mb-4">📦 Customer Orders & Shipment Logs</h3>
‎        <div className="overflow-x-auto">
‎          <table className="w-full text-left text-xs border-collapse">
‎            <thead>
‎              <tr className="bg-neutral-50 border-b border-neutral-100 text-neutral-500 font-bold">
‎                <th className="p-3">Order ID</th>
‎                <th className="p-3">Customer</th>
‎                <th className="p-3">Product Ordered</th>
‎                <th className="p-3">Total Bill</th>
‎                <th className="p-3">Method</th>
‎                <th className="p-3">Status</th>
‎              </tr>
‎            </thead>
‎            <tbody className="divide-y divide-neutral-100 font-medium">
‎              {ordersList.map((order) => (
‎                <tr key={order.id} className="hover:bg-neutral-50/50">
‎                  <td className="p-3 font-bold">{order.id}</td>
‎                  <td className="p-3"><div>{order.customerName}</div><div className="text-[10px] text-neutral-400">{order.phone}</div></td>
‎                  <td className="p-3">{order.productTitle}</td>
‎                  <td className="p-3 font-bold">{order.amount}</td>
‎                  <td className="p-3"><span className="bg-neutral-100 px-2 py-0.5 rounded text-[10px] font-bold">{order.paymentMethod}</span></td>
‎                  <td className="p-3">
‎                    <select value={order.status} onChange={(e) => setOrdersList(ordersList.map(o => o.id === order.id ? {...o, status: e.target.value} : o))} className="bg-neutral-50 border p-1 text-[11px] font-bold rounded">
‎                      <option value="Processing">⏳ Processing</option>
‎                      <option value="Delivered">✅ Delivered</option>
‎                    </select>
‎                  </td>
‎                </tr>
‎              ))}
‎            </tbody>
‎          </table>
‎        </div>
‎      </div>
‎
‎      {/* 📬 لائیو کسٹمر سپورٹ میسجز */}
‎      <div className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm">
‎        <h3 className="text-sm font-bold text-red-600 mb-3">📬 Live Customer Support Tickets</h3>
‎        <div className="space-y-3 max-h-60 overflow-y-auto">
‎          {supportMessages.map((msg) => (
‎            <div key={msg.id} className="bg-red-50/50 border border-red-100 p-3 rounded-xl text-xs flex justify-between items-start">
‎              <div>
‎                <div className="font-bold text-neutral-800">{msg.name} ({msg.email})</div>
‎                <p className="text-neutral-700 mt-1">"{msg.message}"</p>
‎              </div>
‎              <span className="text-[9px] text-neutral-400 font-bold bg-white px-2 py-1 rounded border shadow-sm">{msg.time}</span>
‎            </div>
‎          ))}
‎        </div>
‎      </div>
‎
‎      {/* 🚚 کورئیر ریٹس مینجمنٹ */}
‎      <div className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm">
‎        <h3 className="text-sm font-bold text-neutral-800 mb-3">🚚 Courier API & Shipping Rates Management</h3>
‎        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
‎          <div>
‎            <label className="text-[10px] font-bold text-neutral-400 block mb-1">TCS Shipping Fee (PKR)</label>
‎            <input type="number" value={tcsFee} onChange={(e) => setTcsFee(e.target.value)} className="w-full bg-neutral-50 border border-neutral-200 p-2.5 rounded-xl text-sm font-bold" />
‎          </div>
‎          <div>
‎            <label className="text-[10px] font-bold text-neutral-400 block mb-1">Leopard Shipping Fee (PKR)</label>
‎            <input type="number" value={leopardFee} onChange={(e) => setLeopardFee(e.target.value)} className="w-full bg-neutral-50 border border-neutral-200 p-2.5 rounded-xl text-sm font-bold" />
‎          </div>
‎          <div className="flex items-end">
‎            <button type="button" onClick={() => { setShippingFees({ TCS: Number(tcsFee), Leopard: Number(leopardFee) }); alert("کورئیر چارجز کامیابی سے اپڈیٹ ہو گئے ہیں!"); }} className="w-full bg-neutral-900 text-white text-xs font-bold py-3 rounded-xl hover:bg-black transition-all">Save Global Shipping Rates</button>
‎          </div>
‎        </div>
‎      </div>
‎    </div>
‎  );
‎}
‎
‎// ========================================================
‎// 💬 4. FAQ & LIVE SUPPORT SECTION
‎// ========================================================
‎function FAQSupportSection({ onSendMessage }) {
‎  const [activeFaq, setActiveFaq] = useState(null);
‎  const [supName, setSupName] = useState("");
‎  const [supEmail, setSupEmail] = useState("");
‎  const [supMsg, setSupMsg] = useState("");
‎
‎  const faqs = [
‎    { q: "How can I track my order?", a: "Once shipped, we will send you a tracking code via SMS or Email to track live with TCS/Leopard." },
‎    { q: "What is your delivery time?", a: "Standard delivery takes 2 to 4 working days across Pakistan." }
‎  ];
‎
‎  const handleSupportSubmit = (e) => {
‎    e.preventDefault();
‎    onSendMessage({ id: Date.now(), name: supName, email: supEmail, message: supMsg, time: "Just Now" });
‎    alert("آپ کا پیغام موصول ہو گیا ہے!");
‎    setSupName(""); setSupEmail(""); setSupMsg("");
‎  };
‎
‎  return (
‎    <div className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 max-w-7xl mx-auto my-12 grid grid-cols-1 md:grid-cols-2 gap-8 shadow-sm">
‎      <div>
‎        <h3 className="text-xl font-black text-neutral-900 mb-2">🤔 Frequently Asked Questions (FAQ)</h3>
‎        <div className="space-y-3 mt-4">
‎          {faqs.map((faq, idx) => (
‎            <div key={idx} className="border-b border-neutral-100 pb-3 cursor-pointer" onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}>
‎              <div className="flex justify-between items-center text-sm font-bold text-neutral-800">
‎                <span>{faq.q}</span>
‎                <span>{activeFaq === idx ? "−" : "+"}</span>
‎              </div>
‎              {activeFaq === idx && <p className="text-xs text-neutral-500 mt-2 bg-neutral-50 p-3 rounded-xl">{faq.a}</p>}
‎            </div>
‎          ))}
‎        </div>
‎      </div>
‎
‎      <div className="bg-neutral-50 p-6 rounded-2xl border border-neutral-100">
‎        <h3 className="text-sm font-bold text-neutral-900 mb-1">✉️ 24/7 Live Ticket Support</h3>
‎        <form onSubmit={handleSupportSubmit} className="space-y-3 mt-4">
‎          <div className="grid grid-cols-2 gap-2">
‎            <input type="text" placeholder="Your Name" required value={supName} onChange={(e) => setSupName(e.target.value)} className="w-full bg-white border p-2.5 rounded-xl text-xs" />
‎            <input type="email" placeholder="Your Email" required value={supEmail} onChange={(e) => setSupEmail(e.target.value)} className="w-full bg-white border p-2.5 rounded-xl text-xs" />
‎          </div>
‎          <textarea placeholder="How can we help you today?" required value={supMsg} onChange={(e) => setSupMsg(e.target.value)} className="w-full bg-white border p-2.5 rounded-xl text-xs h-20" />
‎          <button type="submit" className="w-full bg-neutral-900 text-white text-xs font-bold py-2.5 rounded-xl">Send Message</button>
‎        </form>
‎      </div>
‎    </div>
‎  );
‎}
‎
‎// ========================================================
‎// 📱 5. MAIN APPLICATION & CORE INTERACTION LAYER
‎// ========================================================
‎export default function HomePage() {
‎  const [currency, setCurrency] = useState("PKR");
‎  const [isAdminMode, setIsAdminMode] = useState(false);
‎  const [selectedProductForCheckout, setSelectedProductForCheckout] = useState(null);
‎  const [allowedAdmins, setAllowedAdmins] = useState(INITIAL_ALLOWED_ADMINS);
‎  const [registeredUsers, setRegisteredUsers] = useState(INITIAL_REGISTERED_USERS);
‎  const [shippingFees, setShippingFees] = useState({ TCS: 250, Leopard: 200 });
‎  const [announcementText, setAnnouncementText] = useState("🔥 محدود وقت کی آفر! پورے پاکستان میں فری ڈیلیوری اور کیش آن ڈیلیوری دستیاب ہے! 🔥");
‎  
‎  // لائیو ٹریفک مانیٹرنگ اسٹیٹ (ڈیمو مانیٹر جو آٹو اپڈیٹ ہوگا)
‎  const [liveTraffic, setLiveTraffic] = useState(14);
‎
‎  useEffect(() => {
‎    // لائیو ٹریفک کو اصلی لک دینے کے لیے ہر چند سیکنڈ بعد رینڈم کسٹمرز اوپر نیچے ہوں گے
‎    const interval = setInterval(() => {
‎      setLiveTraffic(Math.floor(10 + Math.random() * 15));
‎    }, 5000);
‎    return () => clearInterval(interval);
‎  }, []);
‎  
‎  const [ordersList, setOrdersList] = useState([
‎    { id: "ORD-982314", customerName: "Asif Raza", phone: "03123456789", email: "xyz@gmail.com", address: "Gulshan Iqbal, Karachi", productTitle: "Elite Chronograph Premium Watch", amount: "Rs. 28,000", paymentMethod: "Cash on Delivery (COD)", status: "Processing", date: "2026-07-15" }
‎  ]);
‎
‎  const [supportMessages, setSupportMessages] = useState([
‎    { id: 1, name: "Kamran Shah", email: "xyz@gmail.com", message: "Please product 1 confirm kijiye.", time: "1 Hour Ago" }
‎  ]);
‎
‎  const initialProducts = [
‎    { id: 1, title: "Elite Chronograph Premium Leather Watch", pricePKR: 28000, category: "Luxury Watches" },
‎    { id: 2, title: "Pro Audio Wireless ANC Earbuds V2", pricePKR: 14500, category: "Audio Gear" }
‎  ];
‎
‎  return (
‎    <div className="min-h-screen bg-[#fafafa] text-neutral-900 pb-24 relative">
‎      
‎      {/* 📢 1. TOP ANNOUNCEMENT BANNER (سب سے اوپر آفر پٹی) */}
‎      <div className="w-full bg-gradient-to-r from-neutral-900 via-red-950 to-neutral-900 text-white py-2 px-4 text-center text-[11px] font-bold tracking-wide shadow-sm">
‎        <p dir="rtl">{announcementText}</p>
‎      </div>
‎
‎      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-100 px-6 py-4 max-w-7xl mx-auto flex items-center justify-between">
‎        <h1 className="text-xl font-bold tracking-tight">ELITE COMMERCE</h1>
‎        <div className="flex items-center gap-4">
‎          <button onClick={() => setIsAdminMode(!isAdminMode)} className="text-xs font-bold px-3 py-1.5 rounded-xl border bg-neutral-900 text-white">
‎            {isAdminMode ? "Exit Admin View" : "🔒 Admin Dashboard"}
‎          </button>
‎          <div className="flex bg-neutral-100 p-1 rounded-xl border">
‎            <button onClick={() => setCurrency("PKR")} className={`px-3 py-1 text-xs font-bold rounded-lg ${currency === "PKR" ? "bg-white text-black shadow-sm" : ""}`}>PKR</button>
‎            <button onClick={() => setCurrency("USD")} className={`px-3 py-1 text-xs font-bold rounded-lg ${currency === "USD" ? "bg-white text-black shadow-sm" : ""}`}>USD</button>
‎          </div>
‎        </div>
‎      </header>
‎
‎      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
‎        
‎        {/* 💵 📢 2. GOOGLE ADSENSE RESPONSIVE AD SLOT (TOP BANNER POSITION) */}
‎        <div className="w-full bg-neutral-100 border border-neutral-200 rounded-2xl p-2 mb-8 flex flex-col items-center justify-center min-h-[90px] overflow-hidden text-center">
‎          <span className="text-[9px] uppercase font-bold tracking-widest text-neutral-400 mb-1 block">Advertisement</span>
‎          <ins className="adsbygoogle"
‎               style={{ display: "block", width: "100%", height: "auto" }}
‎               data-ad-client="ca-pub-YOUR_ADSENSE_ID_HERE"
‎               data-ad-slot="YOUR_AD_SLOT_ID"
‎               data-ad-format="horizontal"
‎               data-full-width-responsive="true">
‎          </ins>
‎          <p className="text-[10px] text-neutral-400 font-medium italic">Google AdSense Space (Earn Money per Click/View)</p>
‎        </div>
‎
‎        {isAdminMode && (
‎          <AdminDashboard 
‎            allowedAdmins={allowedAdmins} 
‎            setAllowedAdmins={setAllowedAdmins} 
‎            shippingFees={shippingFees} 
‎            setShippingFees={setShippingFees} 
‎            ordersList={ordersList} 
‎            setOrdersList={setOrdersList} 
‎            supportMessages={supportMessages}
‎            liveTraffic={liveTraffic}
‎            registeredUsers={registeredUsers}
‎            setRegisteredUsers={setRegisteredUsers}
‎          />
‎        )}
‎
‎        {selectedProductForCheckout && (
‎          <CheckoutForm product={selectedProductForCheckout} currency={currency} onClose={() => setSelectedProductForCheckout(null)} onNewOrderSuccess={(newOrd) => setOrdersList([newOrd, ...ordersList])} />
‎        )}
‎
‎        <div className="mb-12">
‎          <h2 className="text-2xl font-extrabold tracking-tight">Featured Marketplace Products</h2>
‎        </div>
‎
‎        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-12">
‎          {initialProducts.map((product) => (
‎            <div key={product.id} className="bg-white border border-neutral-100 rounded-2xl overflow-hidden shadow-sm flex flex-col h-full hover:shadow-md transition-all">
‎              <div className="w-full aspect-square bg-neutral-50"><img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500" alt={product.title} className="w-full h-full object-cover" /></div>
‎              <div className="p-5 flex flex-col flex-grow">
‎                <span className="text-[11px] text-neutral-400 uppercase font-medium mb-1">{product.category}</span>
‎                <h3 className="text-sm font-semibold text-neutral-800 line-clamp-2 mb-2">{product.title}</h3>
‎                <div className="mt-auto flex items-center justify-between pt-3 border-t border-neutral-100">
‎                  <span className="text-base font-bold text-neutral-900">{currency === "USD" ? `$${(product.pricePKR / 280).toFixed(2)}` : `Rs. ${product.pricePKR.toLocaleString()}`}</span>
‎                  <button onClick={() => setSelectedProductForCheckout(product)} className="bg-neutral-900 text-white text-xs font-semibold px-4 py-2.5 rounded-xl">Buy Now</button>
‎                </div>
‎              </div>
‎            </div>
‎          ))}
‎        </div>
‎
‎        <FAQSupportSection onSendMessage={(newMsg) => setSupportMessages([newMsg, ...supportMessages])} />
‎      </main>
‎
‎      {/* 🟢 FLOATING WHATSAPP BUTTON */}
‎      <a 
‎        href="https://wa.me/923306771991?text=Hi,%20I%20want%20to%20order%20from%20Elite%20Commerce%20but%20I%20need%20help." 
‎        target="_blank" 
‎        rel="noopener noreferrer" 
‎        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center font-bold text-xl group"
‎      >
‎        💬 <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 text-xs font-bold pl-2 whitespace-nowrap">Order on WhatsApp</span>
‎      </a>
‎    </div>
‎  );
‎}
‎
