######################################################################### 
# Loop through all Employee models.
# Compare the Additional Emails field against the Primary email.
# List any duplicates
single_emails = Employee.all.map { |e| e.email }

emails = ActiveRecord::Base.connection.exec_query(
  <<-SQL
  SELECT emails.email FROM emails
  WHERE emails.emailable_type = 'Employee'
  SQL
).cast_values

duplicate_emails = emails.map do |value|
  if single_emails.include? value
    "DUPLICATE: #{value},
    Original Employee: #{Employee.where(email: value).first.id},
    Offending Employee: #{Email.where(email: value).emailable_id}"
  end
end

puts duplicate_emails.compact.join("\n")

######################################################################### 
# Loop through all Employee models.
# Compare the Additional Phones field against the Primary phone.
# List any duplicates
single_phones = Employee.all.map { |e| e.phone }

phones = ActiveRecord::Base.connection.exec_query(
  <<-SQL
    SELECT phones.number FROM phones
    WHERE phones.phoneable_type = 'Employee'
  SQL
).cast_values

duplicate_phones = phones.map do |value|
  if single_phones.include? value
    "DUPLICATE: #{value}, Employee ID: #{Phone.where(number: value).first.phoneable_id}"
  end
end

duplicate_phones.compact.join("\n")

######################################################################### 
# Loop through all Employee models
# Check if any Primary email fields are duplicated on any other Employees
# List any duplicates
emails = Employee.all.map { |e| e.email }
duplicate_emails = emails.select { |e| emails.count(e) > 1 }.uniq
duplicate_emails.map { |d|
  { employee_id: Employee.where(email: d).ids, email: d }
}

######################################################################### 
# Loop through all Employee models
# Check if any Primary phone fields are duplicated on any other Employees
# List any duplicates
phones = Employee.all.map { |e| e.phone }
duplicates = phones.select { |e| phones.count(e) > 1 }.uniq
# There are 4 variations of the '000...' fake number being used.
# This list excludes those employees.
fake_numbers = ['00000000000', '0000000000', '000000000', '000000']
duplicates.map { |d|
  if !fake_numbers.include?(d)
    { employee_id: Employee.where(phone: d).ids, phone: d }
  end
}

{:employee_id=>[9618, 9619], :phone=>"9156332031"},
{:employee_id=>[6600, 6602], :phone=>"7605629535"},
{:employee_id=>[1279, 1280], :phone=>"6232510702"},
{:employee_id=>[8608, 8499], :phone=>"9283231372"},
{:employee_id=>[3711, 3713], :phone=>"6024464435"},
{:employee_id=>[8965, 8763], :phone=>"2537207951"},
{:employee_id=>[4088, 4080], :phone=>"7024154888"},
{:employee_id=>[4188, 4111], :phone=>"7221581496"},
{:employee_id=>[9203, 10294], :phone=>"3139806029"},
{:employee_id=>[4359, 4358], :phone=>"5207057137"},
{:employee_id=>[9524, 9870], :phone=>"6192458499"},
{:employee_id=>[5276, 4863], :phone=>"4809384377"},
{:employee_id=>[6995, 4637], :phone=>"6164221316"},
{:employee_id=>[6245, 6242], :phone=>"5205180702"},
{:employee_id=>[6945, 6943], :phone=>"6027869784"},
{:employee_id=>[5735, 9097], :phone=>"5203713292"},
{:employee_id=>[5072, 6327], :phone=>"4198908167"},
{:employee_id=>[5320, 10765], :phone=>"5205180556"},
{:employee_id=>[4425, 4424], :phone=>"4802617571"},
{:employee_id=>[4491, 4493], :phone=>"6024838842"},
{:employee_id=>[5824, 5505], :phone=>"4088871109"},
{:employee_id=>[4752, 4753], :phone=>"9288101342"},
{:employee_id=>[7010, 5559], :phone=>"6029317669"},
{:employee_id=>[5663, 6822], :phone=>"6022849011"},
{:employee_id=>[6632, 6631], :phone=>"9569987501"},
{:employee_id=>[7234, 8337], :phone=>"9282487711"},
{:employee_id=>[8435, 8456], :phone=>"5139759790"},
{:employee_id=>[6247, 8414], :phone=>"5204245626"},
{:employee_id=>[7312, 7311], :phone=>"2568723782"},
{:employee_id=>[8785, 8783, 8779, 8782, 8815, 8836, 8838, 8850, 8852, 8851, 8853, 8854, 8855], :phone=>"8005551212"},
{:employee_id=>[5710, 5707], :phone=>"9286149503"},
{:employee_id=>[704, 837], :phone=>"6023198391"},
{:employee_id=>[3040, 493], :phone=>"9286759864"},
{:employee_id=>[8230, 8228], :phone=>"9282219644"},
{:employee_id=>[4874, 8332], :phone=>"5202805972"},
{:employee_id=>[2857, 2401], :phone=>"6233120130"},
{:employee_id=>[701, 702], :phone=>"6022500289"},
{:employee_id=>[769, 1504, 1784, 1785, 1781], :phone=>"6029999449"},
{:employee_id=>[1275, 1276], :phone=>"6025514629"},
{:employee_id=>[1335, 1333], :phone=>"6023761550"},
{:employee_id=>[1393, 1392], :phone=>"2098397639"},
{:employee_id=>[1457, 1459], :phone=>"3612301456"},
{:employee_id=>[1511, 1660], :phone=>"7069570627"},
{:employee_id=>[1624, 137], :phone=>"6022900269"},
{:employee_id=>[1790, 1791], :phone=>"5204310054"},
{:employee_id=>[2313, 52], :phone=>"9152384221"},
{:employee_id=>[2575, 2633], :phone=>"2093003149"},
{:employee_id=>[2642, 6641], :phone=>"6029213337"},
{:employee_id=>[2803, 3454], :phone=>"5129699972"},
{:employee_id=>[3982, 3983], :phone=>"4803416747"},
{:employee_id=>[3109, 6221], :phone=>"9285502418"},
{:employee_id=>[2195, 2056], :phone=>"4805288569"},
{:employee_id=>[3169, 3175], :phone=>"2523706611"},
{:employee_id=>[4578, 4579], :phone=>"5012068661"},
{:employee_id=>[10289, 10312], :phone=>"4806282202"},
{:employee_id=>[1891, 1892], :phone=>"9702137768"},
{:employee_id=>[8291, 8863], :phone=>"9567801079"},
{:employee_id=>[7922, 5974], :phone=>"8283058940"},
{:employee_id=>[8162, 8163], :phone=>"8505184583"},
{:employee_id=>[9305, 9080], :phone=>"9282097590"},
{:employee_id=>[9406, 9105, 10143], :phone=>"6194196449"},
{:employee_id=>[11100, 11098], :phone=>"2142576550"},
{:employee_id=>[10968, 10969], :phone=>"9564596605"},
{:employee_id=>[10467, 10468], :phone=>"7063261250"},
{:employee_id=>[8570, 4992], :phone=>"9282857627"},
{:employee_id=>[10824, 10823], :phone=>"4422255638"},
{:employee_id=>[8422, 8423], :phone=>"5202805471"},
{:employee_id=>[11113, 11114], :phone=>"6073052110"}]


# (With Employee Profile URLs)
duplicates.map { |d|
  if !fake_numbers.include?(d)
    {
      phone: d,
      employee_ids: Employee.where(phone: d).ids,
      employee_profile_urls: Employee.where(phone: d).map { |e| "https://axis.360industrialservices.com/employees-index/#{e.id}/information" }
    }
  end
}

[
 {
  :phone=>"9156332031",
  :employee_ids=>[9618, 9619],
  :employee_profile_urls=>
   ["https://axis.360industrialservices.com/employees-index/9618/information", 
    "https://axis.360industrialservices.com/employees-index/9619/information"]
  },
 {
  :phone=>"7605629535",
  :employee_ids=>[6600, 6602],
  :employee_profile_urls=>
   ["https://axis.360industrialservices.com/employees-index/6600/information", 
    "https://axis.360industrialservices.com/employees-index/6602/information"]
  },
 {
  :phone=>"6232510702",
  :employee_ids=>[1279, 1280],
  :employee_profile_urls=>
   ["https://axis.360industrialservices.com/employees-index/1279/information", 
    "https://axis.360industrialservices.com/employees-index/1280/information"]
  },
 {
  :phone=>"9283231372",
  :employee_ids=>[8608, 8499],
  :employee_profile_urls=>
   ["https://axis.360industrialservices.com/employees-index/8608/information", 
    "https://axis.360industrialservices.com/employees-index/8499/information"]
  },
 {
  :phone=>"6024464435",
  :employee_ids=>[3711, 3713],
  :employee_profile_urls=>
   ["https://axis.360industrialservices.com/employees-index/3711/information", 
    "https://axis.360industrialservices.com/employees-index/3713/information"]
  },
 {
  :phone=>"2537207951",
  :employee_ids=>[8965, 8763],
  :employee_profile_urls=>
   ["https://axis.360industrialservices.com/employees-index/8965/information", 
    "https://axis.360industrialservices.com/employees-index/8763/information"]
  },
 {
  :phone=>"7024154888",
  :employee_ids=>[4088, 4080],
  :employee_profile_urls=>
   ["https://axis.360industrialservices.com/employees-index/4088/information", 
    "https://axis.360industrialservices.com/employees-index/4080/information"]
  },
 {
  :phone=>"7221581496",
  :employee_ids=>[4188, 4111],
  :employee_profile_urls=>
   ["https://axis.360industrialservices.com/employees-index/4188/information", 
    "https://axis.360industrialservices.com/employees-index/4111/information"]
  },
 {
  :phone=>"3139806029",
  :employee_ids=>[9203, 10294],
  :employee_profile_urls=>
   ["https://axis.360industrialservices.com/employees-index/9203/information", 
    "https://axis.360industrialservices.com/employees-index/10294/information"]
  },
 {
  :phone=>"5207057137",
  :employee_ids=>[4359, 4358],
  :employee_profile_urls=>
   ["https://axis.360industrialservices.com/employees-index/4359/information", 
    "https://axis.360industrialservices.com/employees-index/4358/information"]
  },
 {
  :phone=>"6192458499",
  :employee_ids=>[9524, 9870],
  :employee_profile_urls=>
   ["https://axis.360industrialservices.com/employees-index/9524/information", 
    "https://axis.360industrialservices.com/employees-index/9870/information"]
  },
 {
  :phone=>"4809384377",
  :employee_ids=>[5276, 4863],
  :employee_profile_urls=>
   ["https://axis.360industrialservices.com/employees-index/5276/information", 
    "https://axis.360industrialservices.com/employees-index/4863/information"]
  },
 {
  :phone=>"6164221316",
  :employee_ids=>[6995, 4637],
  :employee_profile_urls=>
   ["https://axis.360industrialservices.com/employees-index/6995/information", 
    "https://axis.360industrialservices.com/employees-index/4637/information"]
  },
 {
  :phone=>"5205180702",
  :employee_ids=>[6245, 6242],
  :employee_profile_urls=>
   ["https://axis.360industrialservices.com/employees-index/6245/information", 
    "https://axis.360industrialservices.com/employees-index/6242/information"]
  },
 {
  :phone=>"6027869784",
  :employee_ids=>[6945, 6943],
  :employee_profile_urls=>
   ["https://axis.360industrialservices.com/employees-index/6945/information", 
    "https://axis.360industrialservices.com/employees-index/6943/information"]
  },
 {
  :phone=>"5203713292",
  :employee_ids=>[5735, 9097],
  :employee_profile_urls=>
   ["https://axis.360industrialservices.com/employees-index/5735/information", 
    "https://axis.360industrialservices.com/employees-index/9097/information"]
  },
 {
  :phone=>"4198908167",
  :employee_ids=>[5072, 6327],
  :employee_profile_urls=>
   ["https://axis.360industrialservices.com/employees-index/5072/information", 
    "https://axis.360industrialservices.com/employees-index/6327/information"]
  },
 {
  :phone=>"5205180556",
  :employee_ids=>[5320, 10765],
  :employee_profile_urls=>
   ["https://axis.360industrialservices.com/employees-index/5320/information", 
    "https://axis.360industrialservices.com/employees-index/10765/information"]
  },
 {
  :phone=>"4802617571",
  :employee_ids=>[4425, 4424],
  :employee_profile_urls=>
   ["https://axis.360industrialservices.com/employees-index/4425/information", 
    "https://axis.360industrialservices.com/employees-index/4424/information"]
  },
 {
  :phone=>"6024838842",
  :employee_ids=>[4491, 4493],
  :employee_profile_urls=>
   ["https://axis.360industrialservices.com/employees-index/4491/information", 
    "https://axis.360industrialservices.com/employees-index/4493/information"]
  },
 {
  :phone=>"4088871109",
  :employee_ids=>[5824, 5505],
  :employee_profile_urls=>
   ["https://axis.360industrialservices.com/employees-index/5824/information", 
    "https://axis.360industrialservices.com/employees-index/5505/information"]
  },
 {
  :phone=>"9288101342",
  :employee_ids=>[4752, 4753],
  :employee_profile_urls=>
   ["https://axis.360industrialservices.com/employees-index/4752/information", 
    "https://axis.360industrialservices.com/employees-index/4753/information"]
  },
 {
  :phone=>"6029317669",
  :employee_ids=>[7010, 5559],
  :employee_profile_urls=>
   ["https://axis.360industrialservices.com/employees-index/7010/information", 
    "https://axis.360industrialservices.com/employees-index/5559/information"]
  },
 {
  :phone=>"6022849011",
  :employee_ids=>[5663, 6822],
  :employee_profile_urls=>
   ["https://axis.360industrialservices.com/employees-index/5663/information", 
    "https://axis.360industrialservices.com/employees-index/6822/information"]
  },
 {
  :phone=>"9569987501",
  :employee_ids=>[6632, 6631],
  :employee_profile_urls=>
   ["https://axis.360industrialservices.com/employees-index/6632/information", 
    "https://axis.360industrialservices.com/employees-index/6631/information"]
  },
 {
  :phone=>"9282487711",
  :employee_ids=>[7234, 8337],
  :employee_profile_urls=>
   ["https://axis.360industrialservices.com/employees-index/7234/information", 
    "https://axis.360industrialservices.com/employees-index/8337/information"]
  },
 {
  :phone=>"5139759790",
  :employee_ids=>[8435, 8456],
  :employee_profile_urls=>
   ["https://axis.360industrialservices.com/employees-index/8435/information", 
    "https://axis.360industrialservices.com/employees-index/8456/information"]
  },
 {
  :phone=>"5204245626",
  :employee_ids=>[6247, 8414],
  :employee_profile_urls=>
   ["https://axis.360industrialservices.com/employees-index/6247/information", 
    "https://axis.360industrialservices.com/employees-index/8414/information"]
  },
 {
  :phone=>"2568723782",
  :employee_ids=>[7312, 7311],
  :employee_profile_urls=>
   ["https://axis.360industrialservices.com/employees-index/7312/information", 
    "https://axis.360industrialservices.com/employees-index/7311/information"]
  },
 {
  :phone=>"8005551212",
  :employee_ids=>[8785, 8783, 8779, 8782, 8815, 8836, 8838, 8850, 8852, 8851, 8853, 8854, 8855],
  :employee_profile_urls=>
   ["https://axis.360industrialservices.com/employees-index/8785/information",
    "https://axis.360industrialservices.com/employees-index/8783/information",
    "https://axis.360industrialservices.com/employees-index/8779/information",
    "https://axis.360industrialservices.com/employees-index/8782/information",
    "https://axis.360industrialservices.com/employees-index/8815/information",
    "https://axis.360industrialservices.com/employees-index/8836/information",
    "https://axis.360industrialservices.com/employees-index/8838/information",
    "https://axis.360industrialservices.com/employees-index/8850/information",
    "https://axis.360industrialservices.com/employees-index/8852/information",
    "https://axis.360industrialservices.com/employees-index/8851/information",
    "https://axis.360industrialservices.com/employees-index/8853/information",
    "https://axis.360industrialservices.com/employees-index/8854/information",
    "https://axis.360industrialservices.com/employees-index/8855/information"]
  },
 {
  :phone=>"9286149503",
  :employee_ids=>[5710, 5707],
  :employee_profile_urls=>
   ["https://axis.360industrialservices.com/employees-index/5710/information", 
    "https://axis.360industrialservices.com/employees-index/5707/information"]
  },
 {
  :phone=>"6023198391",
  :employee_ids=>[704, 837],
  :employee_profile_urls=>
   ["https://axis.360industrialservices.com/employees-index/704/information", 
    "https://axis.360industrialservices.com/employees-index/837/information"]
  },
 {
  :phone=>"9286759864",
  :employee_ids=>[3040, 493],
  :employee_profile_urls=>
   ["https://axis.360industrialservices.com/employees-index/3040/information", 
    "https://axis.360industrialservices.com/employees-index/493/information"]
  },
 {
  :phone=>"9282219644",
  :employee_ids=>[8230, 8228],
  :employee_profile_urls=>
   ["https://axis.360industrialservices.com/employees-index/8230/information", 
    "https://axis.360industrialservices.com/employees-index/8228/information"]
  },
 {
  :phone=>"5202805972",
  :employee_ids=>[4874, 8332],
  :employee_profile_urls=>
   ["https://axis.360industrialservices.com/employees-index/4874/information", 
    "https://axis.360industrialservices.com/employees-index/8332/information"]
  },
 {
  :phone=>"6233120130",
  :employee_ids=>[2857, 2401],
  :employee_profile_urls=>
   ["https://axis.360industrialservices.com/employees-index/2857/information", 
    "https://axis.360industrialservices.com/employees-index/2401/information"]
  },
 {
  :phone=>"6022500289",
  :employee_ids=>[701, 702],
  :employee_profile_urls=>
   ["https://axis.360industrialservices.com/employees-index/701/information", 
    "https://axis.360industrialservices.com/employees-index/702/information"]
  },
 {
  :phone=>"6029999449",
  :employee_ids=>[769, 1504, 1784, 1785, 1781],
  :employee_profile_urls=>
   ["https://axis.360industrialservices.com/employees-index/769/information",
    "https://axis.360industrialservices.com/employees-index/1504/information",
    "https://axis.360industrialservices.com/employees-index/1784/information",
    "https://axis.360industrialservices.com/employees-index/1785/information",
    "https://axis.360industrialservices.com/employees-index/1781/information"]
  },
 {
  :phone=>"6025514629",
  :employee_ids=>[1275, 1276],
  :employee_profile_urls=>
   ["https://axis.360industrialservices.com/employees-index/1275/information", 
    "https://axis.360industrialservices.com/employees-index/1276/information"]
  },
 {
  :phone=>"6023761550",
  :employee_ids=>[1335, 1333],
  :employee_profile_urls=>
   ["https://axis.360industrialservices.com/employees-index/1335/information", 
    "https://axis.360industrialservices.com/employees-index/1333/information"]
  },
 {
  :phone=>"2098397639",
  :employee_ids=>[1393, 1392],
  :employee_profile_urls=>
   ["https://axis.360industrialservices.com/employees-index/1393/information", 
    "https://axis.360industrialservices.com/employees-index/1392/information"]
  },
 {
  :phone=>"3612301456",
  :employee_ids=>[1457, 1459],
  :employee_profile_urls=>
   ["https://axis.360industrialservices.com/employees-index/1457/information", 
    "https://axis.360industrialservices.com/employees-index/1459/information"]
  },
 {
  :phone=>"7069570627",
  :employee_ids=>[1511, 1660],
  :employee_profile_urls=>
   ["https://axis.360industrialservices.com/employees-index/1511/information", 
    "https://axis.360industrialservices.com/employees-index/1660/information"]
  },
 {
  :phone=>"6022900269",
  :employee_ids=>[1624, 137],
  :employee_profile_urls=>
   ["https://axis.360industrialservices.com/employees-index/1624/information", 
    "https://axis.360industrialservices.com/employees-index/137/information"]
  },
 {
  :phone=>"5204310054",
  :employee_ids=>[1790, 1791],
  :employee_profile_urls=>
   ["https://axis.360industrialservices.com/employees-index/1790/information", 
    "https://axis.360industrialservices.com/employees-index/1791/information"]
  },
 {
  :phone=>"9152384221",
  :employee_ids=>[2313, 52],
  :employee_profile_urls=>
   ["https://axis.360industrialservices.com/employees-index/2313/information", 
    "https://axis.360industrialservices.com/employees-index/52/information"]
  },
 {
  :phone=>"2093003149",
  :employee_ids=>[2575, 2633],
  :employee_profile_urls=>
   ["https://axis.360industrialservices.com/employees-index/2575/information", 
    "https://axis.360industrialservices.com/employees-index/2633/information"]
  },
 {
  :phone=>"6029213337",
  :employee_ids=>[2642, 6641],
  :employee_profile_urls=>
   ["https://axis.360industrialservices.com/employees-index/2642/information", 
    "https://axis.360industrialservices.com/employees-index/6641/information"]
  },
 {
  :phone=>"5129699972",
  :employee_ids=>[2803, 3454],
  :employee_profile_urls=>
   ["https://axis.360industrialservices.com/employees-index/2803/information", 
    "https://axis.360industrialservices.com/employees-index/3454/information"]
  },
 {
  :phone=>"4803416747",
  :employee_ids=>[3982, 3983],
  :employee_profile_urls=>
   ["https://axis.360industrialservices.com/employees-index/3982/information", 
    "https://axis.360industrialservices.com/employees-index/3983/information"]
  },
 {
  :phone=>"9285502418",
  :employee_ids=>[3109, 6221],
  :employee_profile_urls=>
   ["https://axis.360industrialservices.com/employees-index/3109/information", 
    "https://axis.360industrialservices.com/employees-index/6221/information"]
  },
 {
  :phone=>"4805288569",
  :employee_ids=>[2195, 2056],
  :employee_profile_urls=>
   ["https://axis.360industrialservices.com/employees-index/2195/information", 
    "https://axis.360industrialservices.com/employees-index/2056/information"]
  },
 {
  :phone=>"2523706611",
  :employee_ids=>[3169, 3175],
  :employee_profile_urls=>
   ["https://axis.360industrialservices.com/employees-index/3169/information", 
    "https://axis.360industrialservices.com/employees-index/3175/information"]
  },
 {
  :phone=>"5012068661",
  :employee_ids=>[4578, 4579],
  :employee_profile_urls=>
   ["https://axis.360industrialservices.com/employees-index/4578/information", 
    "https://axis.360industrialservices.com/employees-index/4579/information"]
  },
 {
  :phone=>"4806282202",
  :employee_ids=>[10289, 10312],
  :employee_profile_urls=>
   ["https://axis.360industrialservices.com/employees-index/10289/information", 
    "https://axis.360industrialservices.com/employees-index/10312/information"]
  },
 {
  :phone=>"9702137768",
  :employee_ids=>[1891, 1892],
  :employee_profile_urls=>
   ["https://axis.360industrialservices.com/employees-index/1891/information", 
    "https://axis.360industrialservices.com/employees-index/1892/information"]
  },
 {
  :phone=>"9567801079",
  :employee_ids=>[8291, 8863],
  :employee_profile_urls=>
   ["https://axis.360industrialservices.com/employees-index/8291/information", 
    "https://axis.360industrialservices.com/employees-index/8863/information"]
  },
 {
  :phone=>"8283058940",
  :employee_ids=>[7922, 5974],
  :employee_profile_urls=>
   ["https://axis.360industrialservices.com/employees-index/7922/information", 
    "https://axis.360industrialservices.com/employees-index/5974/information"]
  },
 {
  :phone=>"8505184583",
  :employee_ids=>[8162, 8163],
  :employee_profile_urls=>
   ["https://axis.360industrialservices.com/employees-index/8162/information", 
    "https://axis.360industrialservices.com/employees-index/8163/information"]
  },
 {
  :phone=>"9282097590",
  :employee_ids=>[9305, 9080],
  :employee_profile_urls=>
   ["https://axis.360industrialservices.com/employees-index/9305/information", 
    "https://axis.360industrialservices.com/employees-index/9080/information"]
  },
 {
  :phone=>"6194196449",
  :employee_ids=>[9406, 9105, 10143],
  :employee_profile_urls=>
   ["https://axis.360industrialservices.com/employees-index/9406/information",
    "https://axis.360industrialservices.com/employees-index/9105/information",
    "https://axis.360industrialservices.com/employees-index/10143/information"]
  },
 {
  :phone=>"2142576550",
  :employee_ids=>[11100, 11098],
  :employee_profile_urls=>
   ["https://axis.360industrialservices.com/employees-index/11100/information", 
    "https://axis.360industrialservices.com/employees-index/11098/information"]
  },
 {
  :phone=>"9564596605",
  :employee_ids=>[10968, 10969],
  :employee_profile_urls=>
   ["https://axis.360industrialservices.com/employees-index/10968/information", 
    "https://axis.360industrialservices.com/employees-index/10969/information"]
  },
 {
  :phone=>"7063261250",
  :employee_ids=>[10467, 10468],
  :employee_profile_urls=>
   ["https://axis.360industrialservices.com/employees-index/10467/information", 
    "https://axis.360industrialservices.com/employees-index/10468/information"]
  },
 {
  :phone=>"9282857627",
  :employee_ids=>[8570, 4992],
  :employee_profile_urls=>
   ["https://axis.360industrialservices.com/employees-index/8570/information", 
    "https://axis.360industrialservices.com/employees-index/4992/information"]
  },
 {
  :phone=>"4422255638",
  :employee_ids=>[10824, 10823],
  :employee_profile_urls=>
   ["https://axis.360industrialservices.com/employees-index/10824/information", 
    "https://axis.360industrialservices.com/employees-index/10823/information"]
  },
 {
  :phone=>"5202805471",
  :employee_ids=>[8422, 8423],
  :employee_profile_urls=>
   ["https://axis.360industrialservices.com/employees-index/8422/information", 
    "https://axis.360industrialservices.com/employees-index/8423/information"]
  },
 {
  :phone=>"6073052110",
  :employee_ids=>[11113, 11114],
  :employee_profile_urls=>
   ["https://axis.360industrialservices.com/employees-index/11113/information", 
    "https://axis.360industrialservices.com/employees-index/11114/information"]
  }
]