import {
   Accordion,
   AccordionContent,
   AccordionItem, 
   AccordionTrigger
} from '@/components/ui/accordion'
import Link from 'next/link'

const FAQAccordion = () => {
   return (
      <>
      <Accordion type='single' collapsible className='w-full bg-slate-50/10 rounded-md py-2 my-2'>
         <AccordionItem value='q1' className='px-4 my-2'>
            <AccordionTrigger>What is ETHSafari Hackathon 2024?</AccordionTrigger>
            <AccordionContent>
            The ETHSafari Hackathon is a global event aimed at driving innovation from Africa, focusing on building scalable blockchain solutions that promote prosperity and innovation in emerging markets.
            </AccordionContent>
         </AccordionItem>
         <AccordionItem value='q2' className='px-4 my-2'>
            <AccordionTrigger>When and where is it happening?</AccordionTrigger>
            <AccordionContent>
            The hackathon will take place from September 8th to 11th, 2024, in Nairobi, Kenya.
            </AccordionContent>
         </AccordionItem>
         <AccordionItem value='q3' className='px-4 my-2'>
            <AccordionTrigger>Who can participate?</AccordionTrigger>
            <AccordionContent>
            Developers, designers, and blockchain enthusiasts from around the world are welcome to join.
            </AccordionContent>
         </AccordionItem>
         <AccordionItem value='q4' className='px-4 my-2'>
            <AccordionTrigger>What is the theme?</AccordionTrigger>
            <AccordionContent>
            This year’s theme revolves around the Prosperity Paradox, emphasizing solutions that drive prosperity rather than just addressing problems.
            </AccordionContent>
         </AccordionItem>
         <AccordionItem value='q5' className='px-4 my-2'>
            <AccordionTrigger>What are the key activities?</AccordionTrigger>
            <AccordionContent>
            Participants will engage in round-the-clock hacking, workshops, and mentorship sessions at a 24/7 hacker space designed for collaboration and innovation.
            </AccordionContent>
         </AccordionItem>
         <AccordionItem value='q6' className='px-4 my-2'>
            <AccordionTrigger>Are there prizes?</AccordionTrigger>
            <AccordionContent>
            Yes, there are various prizes, including a special $1,000 award for the Most Robust Code, along with other bounties and rewards.
            </AccordionContent>
         </AccordionItem>
         <AccordionItem value='q7' className='px-4 my-2'>
            <AccordionTrigger>Will there be code audits?</AccordionTrigger>
            <AccordionContent>
            Yes, code audits will be provided for hackathon projects, and judges may automatically include audits for bounty submissions.
            </AccordionContent>
         </AccordionItem>
         <AccordionItem value='q8' className='px-4 my-2'>
            <AccordionTrigger>How do I submit a project?</AccordionTrigger>
            <AccordionContent>
            You can register through the official ETHSafari Hackathon platform.
            </AccordionContent>
         </AccordionItem>
         <AccordionItem value='q9' className='px-4 my-2'>
            <AccordionTrigger>What projects are in scope?</AccordionTrigger>
            <AccordionContent>
            Projects must deploy on a testnet or mainnet and can leverage EVM-compatible integrations.
            </AccordionContent>
         </AccordionItem>
         <AccordionItem value='q10' className='px-4 my-2'>
            <AccordionTrigger>Can I work alone?</AccordionTrigger>
            <AccordionContent>
            No, solo hacking is not allowed. Each project must have at least two team members.
            </AccordionContent>
         </AccordionItem>
         <AccordionItem value='q11' className='px-4 my-2'>
            <AccordionTrigger>Can I submit an existing project?</AccordionTrigger>
            <AccordionContent>
            Yes, existing projects can participate, but you must submit new code during the hackathon (September 8-11) and keep the code open source.
            </AccordionContent>
         </AccordionItem>
      </Accordion>
      <p>For more details, please visit the <Link href='https://safaridao.notion.site/What-is-this-years-ETHSafari-Hackathon-FAQ-Wiki-5da2435d8b8d4b3eb9e6460603bf7f32'>Official Event Page</Link></p>
      </>
   )
}


export default FAQAccordion